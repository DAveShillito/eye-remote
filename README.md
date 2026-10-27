# Eye Remote (phone page)

Settings, a virtual stick and the mode buttons for the eye, over Web Bluetooth. No build
step and nothing loaded from the internet.

| File | What it is |
|---|---|
| `index.html` | the whole page |
| `manifest.webmanifest`, `icon-*.png` | lets Chrome install it as an app |
| `sw.js` | keeps the files on the phone so the installed app opens offline |

- Works in **Chrome on Android** (and desktop Chrome). Not iPhone Safari.
- Must be served over **HTTPS**, or from `localhost`.
- Talks to the eye directly over Bluetooth: no Wi-Fi or mobile data needed once installed.
- The gamepad can stay connected at the same time.
- The BLE service it uses is described in `eye/src/phone_link.h`; its UUIDs must match
  `eye/src/phone_link.cpp`.

## Putting it on GitHub Pages

1. On github.com, create a new **public** repository (e.g. `eye-remote`).
2. **Add file → Upload files**: drag in all five files from this folder (not this README
   if you'd rather not), then **Commit changes**.
3. **Settings → Pages**: Source **Deploy from a branch**, branch **main**, folder **/ (root)**,
   **Save**. After a minute or two the page is at `https://<username>.github.io/eye-remote/`.

## Installing on the phone

1. Open that address in **Chrome** on the phone (with a signal, the first time).
2. Chrome menu (⋮) → **Add to home screen** → **Install**.
3. Check it offline: airplane mode **with Bluetooth switched back on**, open **Eye** from the
   home screen, tap **Connect**, choose **Eye**.

Chrome asks for the "Nearby devices" permission the first time; allow it.

## Updating

Upload the changed files to the repo. The installed app picks up the new version the next
time it's opened with a signal (the launch after that shows it). If an update doesn't
appear, bump `VERSION` in `sw.js` and upload that too.

## Local test on the PC

`python -m http.server 8000 --bind 127.0.0.1 --directory phone`, then open
`http://localhost:8000` in Chrome.
