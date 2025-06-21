# 🎵 SoundCloud Discord Rich Presence (Bêta)

SoundCloud Discord Rich Presence est une application Electron qui permet d’afficher automatiquement sur votre profil Discord ce que vous écoutez sur SoundCloud, avec des détails comme le titre, l’artiste, une barre de progression et un bouton pour écouter directement le morceau.

## 🚀 Fonctionnalités

- 🎶 Affiche le titre et l’artiste du morceau en cours.
- ⏱️ Indique la progression de la musique (fonctionnalité en cours de développement).
- 🔗 Bouton "Écouter" qui ouvre le morceau sur SoundCloud (en développement).
- 🖼️ Icône statique personnalisée pour simuler la cover (Discord ne prend pas en charge les covers dynamiques pour SoundCloud).

## 📦 Prérequis

- [Node.js](https://nodejs.org/)
- [Electron](https://www.electronjs.org/)
- Un compte Discord avec une application Developer configurée (Rich Presence activé).
- (Optionnel) Une image nommée `soundcloud` dans la section **Rich Presence > Art Assets** de votre app Discord.

## ⚙️ Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/clydedc/soundcloud.git
   cd soundcloud

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Lancez l’application :

   ```bash
   npx electron .
   ```

## 🛠 Configuration

Dans le fichier `rpc.js`, remplacez la variable `clientId` par l’ID de votre application Discord. (pas obligatoire)

> Ce n’est pas obligatoire, mais recommandé pour personnaliser l’intégration.

## ⚠️ Limitations

* Les covers dynamiques ne sont pas supportées par Discord Rich Presence.
* Fonctionne uniquement avec le **client Discord Desktop** (pas sur le navigateur).

## 👤 Auteur

* **Clyde**

---

💡 *Profitez de vos sons préférés sur SoundCloud tout en les partageant sur Discord !*

