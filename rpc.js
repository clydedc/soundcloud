const RPC = require("discord-rpc");
const clientId = "1385927699041747065"; // you can change this to your own client ID if needed
// Make sure to register your application on the Discord Developer Portal and set the client ID accordingly

const rpc = new RPC.Client({ transport: "ipc" });

function initRPC() {
  RPC.register(clientId);
  rpc.login({ clientId })
    .then(() => console.log("Tentative de connexion à Discord RPC..."))
    .catch(err => {
      console.error("Erreur lors de la connexion à Discord RPC :", err);
    });

  rpc.on("ready", () => {
    console.log("✅ Discord RPC prêt !");
    setActivity("En attente de lecture", "SoundCloud");
  });
}

function setActivity(trackTitle = "Rien", artist = "Inconnu", backgroundImage = null, startTimestamp = null, endTimestamp = null, url = null) {
  if (!rpc) return;

  const activity = {
    details: `🎵 ${trackTitle}`,
    state: `👤 ${artist}`,
    largeImageKey: backgroundImage || 'soundcloud', // Utilise une image statique uploadée dans Discord Developer Portal
    largeImageText: backgroundImage || 'SoundCloud',
    instance: true,
  };

  if (
    typeof startTimestamp === "number" &&
    typeof endTimestamp === "number" &&
    !isNaN(startTimestamp) &&
    !isNaN(endTimestamp)
  ) {
    activity.startTimestamp = startTimestamp;
    activity.endTimestamp = endTimestamp;
  }

  if (url) {
    activity.buttons = [
      { label: "Écouter la musique", url }
    ];
  }

  rpc.setActivity(activity);
}


module.exports = { initRPC, setActivity };