ANNIVERSARY WEBSITE — FTANK & LOVE

FILES
- index.html: website content
- style.css: romantic dark design and responsive layout
- script.js: countdown, photo lightbox, surprise reveal, music controls

PERSONALIZE BEFORE PUBLISHING
1. Open index.html in a code editor.
2. Search for the three image URLs in the gallery and replace each URL with your own hosted image URL, OR put your images in an `images` folder and use paths such as `images/us-1.jpg`.
3. To use local photos, change each <img src="https://..."> to <img src="images/us-1.jpg"> etc., and create the images folder.
4. Add a music file named music.mp3 in the same folder. In index.html, find:
   <!-- <source src="music.mp3" type="audio/mpeg"> -->
   Remove the HTML comment markers so it becomes:
   <source src="music.mp3" type="audio/mpeg">
   Use a song you have permission to share. Most browsers require the visitor to tap Play.
5. The page currently assumes your relationship began on November 11, 2024, based on a two-year anniversary on November 11, 2026. Change the hero date if needed.
6. Edit the letter in index.html so it sounds like you and includes your real memories.

PUBLISH WITH GITHUB PAGES (FREE)
1. Create/sign in to a GitHub account at https://github.com.
2. Create a new public repository, e.g. `for-my-love`.
3. Upload index.html, style.css, script.js, README.txt, and your images/music files (if used) to the repository root.
4. Open the repository's Settings → Pages.
5. Under Build and deployment, choose “Deploy from a branch”, choose `main` and `/(root)`, then Save.
6. Wait a minute or two. The Pages section will show a public website URL like https://YOUR-USERNAME.github.io/for-my-love/.
7. Open that URL on your phone to test it, then send it to her.

IMPORTANT
- GitHub Pages sites in public repositories are public to anyone with the link; a password screen added in front-end JavaScript would not provide real privacy.
- Avoid uploading private or sensitive photos. The website and its images may be accessible publicly.
- A custom MP3 may increase repository size. Keep files small.


LOVE LAB MINI-GAME
- The website includes a playful “I love you too!” interaction. Each time “I don’t love you” is clicked, that button shrinks while “I love you too!” grows. Clicking “I love you too!” reveals a romantic message and floating hearts.
- The game is fully client-side; no database or account is needed.
- The score is just for fun and all answer choices are treated respectfully.
