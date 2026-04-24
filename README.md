# 🎵 Spotify Clone (React)

A frontend-focused clone of Spotify built using React.
This project replicates Spotify-style UI and key interactions including playlist browsing, live song search, custom playlists, and a working bottom player.

---

## 🚀 Features

* 🎧 Spotify-like layout with sidebar, top bar, and fixed player
* 🏠 Home dashboard with quick tiles and content rows
* 📄 Playlist pages with fetched tracks and play controls
* 🔍 Global search from navbar (`What do you want to play?`) + Search page results
* ▶️ Bottom player with play/pause, next/prev, seek bar, and queue behavior
* ❤️ Custom playlist creation (`+ Add`) and Library page playback
* 🖼️ Dynamic artist images in left rail (no random avatars)
* 🎵 Full-length local playlist support (`Full Songs (Local)`) in addition to preview tracks
* 🌐 API-based track data with resilient fallbacks
* 🟢 Optional Spotify connect flow for official Made For You artwork (PKCE)

---

## 🛠️ Tech Stack

* React (Vite)
* React Router DOM
* JavaScript (ES6+)
* CSS (custom styling)

---

## 📂 Folder Structure

```txt
src/
 ├── App.css
 ├── App.jsx
 ├── index.css
 ├── main.jsx
 │
 ├── Components/
 │    ├── Card.jsx
 │    ├── Navbar.jsx
 │    ├── Player.jsx
 │    ├── Sidebar.jsx
 │    └── SongRow.jsx
 │
 ├── pages/
 │    ├── Home.jsx
 │    ├── Library.jsx
 │    ├── Player.jsx
 │    ├── Playlist.jsx
 │    └── Search.jsx
 │
 ├── data/
 │    └── data.js
 │
 └── services/
      ├── musicApi.js
      └── spotifyApi.js
```

---

## ⚙️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/your-username/spotify-clone.git
```

2. Navigate into the project

```bash
cd spotify-clone
```

3. Install dependencies

```bash
npm install
```

4. Run the development server

```bash
npm run dev
```

### Optional: Official Spotify Covers (Made For You)

To fetch official Spotify playlist images in the Made For You section:

1. Create a Spotify app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Copy `.env.example` to `.env`
3. Add your client id:

```env
VITE_SPOTIFY_CLIENT_ID=your_spotify_app_client_id
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173
```

4. In Spotify app settings, add the same redirect URI
5. Restart dev server and click `Connect Spotify` on Home

---

## 🆕 Recent Updates

* Added artist support for Travis Scott, Playboi Carti, Future, and Don Toliver
* Added full-song playback path using local full-length tracks
* Fixed player pause/resume so it does not restart from zero
* Added functioning global search from navbar input
* Added custom playlists and Library route
* Improved image fallback logic for cards and rows
* Added Spotify PKCE integration hooks for official artwork fetch

---

## 👥 Team Contribution

This project was built collaboratively by a team of 3 members:

* **Person A** → Layout, Sidebar, Navbar, Routing
* **Person B** → Pages, Cards, Playlist UI
* **Person C** → Player, State Management

---

## 🔄 Git Workflow

* Feature branches were used:
  * `feature/layout`
  * `feature/pages`
  * `feature/player`
* Pull requests and code reviews ensured collaboration
* Cross-editing was performed across modules

---

## 📌 Future Improvements

* 🔊 Integrate licensed full-track catalog and backend queue sync
* 🔐 User authentication and persistent cloud playlists
* ☁️ Backend integration for user libraries/history
* ❤️ Like/save tracks with account-level state
* 📱 Further mobile UX polish and gestures

---

## ⚠️ Disclaimer

This project is for educational purposes only.
It is not affiliated with or endorsed by Spotify.

---

## 🌟 Acknowledgment

Inspired by the UI/UX of Spotify.
