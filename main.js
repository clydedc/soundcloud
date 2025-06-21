const { app, BrowserWindow } = require('electron');
const path = require('path');
const { setActivity, initRPC } = require('./rpc');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadURL('https://soundcloud.com');

  win.webContents.on('did-finish-load', () => {
    setInterval(() => {
      win.webContents.executeJavaScript(`
        (() => {
          const title = document.querySelector('.playbackSoundBadge__titleLink span[aria-hidden="true"]')?.innerText;
          const artist = document.querySelector('.playbackSoundBadge__lightLink')?.innerText;
          const backgroundImageElem = document.querySelector('.sc-artwork.image__full');
          let backgroundImage = null;
          if (backgroundImageElem) {
            const bg = backgroundImageElem.style.backgroundImage;
            backgroundImage = bg && bg.startsWith('url("') ? bg.slice(5, -2) : null;
          }
          const currentElem = document.querySelector('.playbackTimeline__timePassed span');
          const durationElem = document.querySelector('.playbackTimeline__duration span');
          const current = currentElem ? currentElem.innerText : null;
          const duration = durationElem ? durationElem.innerText : null;
          const urlElem = document.querySelector('.playbackSoundBadge__titleLink');
          let url = urlElem ? urlElem.href : null;
          if (url && url.startsWith('/')) {
            url = 'https://soundcloud.com' + url;
          }
          return { title, artist, backgroundImage, current, duration, url };
        })()
      `).then(data => {
        console.log("Données récupérées depuis SoundCloud :", data);
        if (data?.title && data?.artist) {
          let startTimestamp = undefined, endTimestamp = undefined;
          if (data.current && data.duration) {
            const toSec = t => {
              if (!t) return 0;
              const parts = t.split(':').map(Number);
              return parts.length === 2 ? parts[0] * 60 + parts[1] : 0;
            };
            const now = Math.floor(Date.now() / 1000);
            const currentSec = toSec(data.current);
            const durationSec = toSec(data.duration);
            startTimestamp = now - currentSec;
            endTimestamp = startTimestamp + durationSec;
          }
          setActivity(data.title, data.artist, data.backgroundImage, startTimestamp, endTimestamp, data.url);
        }
      });
    }, 1000);
  });
}

app.whenReady().then(() => {
  createWindow();
  initRPC();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});