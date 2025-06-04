# 🎨 Cinnamonbred's Magical Art Website ✨

A beautiful, cozy cottage-inspired website showcasing Kate's amazing artwork with romantic easter eggs and interactive features!

## 🌟 Features

- **Studio Ghibli-inspired cozy cottage design**
- **Kate's real artwork gallery** with beautiful wooden frames
- **💕 Hidden romantic easter eggs** - click the hearts to reveal love messages!
- **🌧️ Ambient sounds** - Rain and fireplace sounds for cozy vibes
- **💝 Guest book** - Visitors can leave magical messages that save to a text file
- **Responsive design** that works beautifully on all devices

## 🚀 How to Run

### Option 1: Enhanced Server (with Guest Book) ⭐ RECOMMENDED
```bash
python3 server.py
```
Then visit: `http://localhost:8080`

This runs a custom server that:
- Serves all the website files
- Saves guest book messages to `guestbook.txt`
- Loads existing messages when visitors arrive

### Option 2: Simple Static Server
```bash
python3 -m http.server 8080
```
Then visit: `http://localhost:8080`

(Guest book won't save to file, but everything else works!)

## 💕 Easter Eggs

Look for the subtle **💕 hearts** scattered throughout the website! Click them to reveal sweet romantic messages:

- "You will always be my baby bear :D"
- "No one could touch my heart like you do"
- "Your art is as beautiful as your soul ✨"
- "Every day with you feels like magic 💫" 
- "You make my world more colorful 🌈"

## 🎵 Ambient Sounds

In the footer, you'll find magical sound controls:
- **🔊 Sound FX** - Enables sparkle effects and interactions
- **🌧️ Rain Sounds** - Gentle, soothing rain atmosphere
- **🔥 Cozy Fire** - Crackling fireplace for ultimate coziness

## 💝 Guest Book

Visitors can leave encouraging messages about Kate's art! Messages are saved to `guestbook.txt` and will persist between visits.

## 📁 File Structure

```
Cinnamonbred/
├── index.html              # Main website
├── style.css               # All the beautiful styling
├── script.js               # Interactive magic & animations
├── server.py               # Enhanced server with guest book
├── placeholder_acorn.svg   # Logo icon
├── placeholder_paintbrush.svg # Button icon
├── guestbook.txt           # Guest messages (created automatically)
└── cinnamonbred-website/
    └── public/
        └── Kate Art!/       # Kate's beautiful artwork
```

## 🎨 Kate's Artwork

The website showcases Kate's real artwork from different periods:
- Fantasy Character Portrait (Aug 2020)
- Autumn Spirits (Oct 2020)
- Cozy Character Study (Jun 2021)
- Dreamy Illustration (Sep 2021)
- Love & Magic (Feb 2022)
- Winter Wonder (Feb 2022)
- Spring's First Bloom (Feb 2022)

## 💫 Made with Love

This website was crafted with love as a surprise for Kate to showcase her incredible artistic talent. Every detail, from the floating fireflies to the hidden love messages, was designed to create a magical experience that reflects the beauty and warmth of her art.

✨ **Happy exploring, and may you find all the hidden magic!** ✨ 