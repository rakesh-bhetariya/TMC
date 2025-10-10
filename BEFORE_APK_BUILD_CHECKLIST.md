# BEFORE Building APK - Required Checklist

## CRITICAL: Complete These Steps BEFORE Building APK

### 1. Create PNG Icons (REQUIRED)

The manifest.json file currently references PNG icons that DO NOT exist:
- `public/icon-192.png` - MISSING
- `public/icon-512.png` - MISSING

**Action Required:**
1. Open `public/icon-guide.md` for detailed instructions
2. Create both PNG files using one of the suggested methods
3. Place them in the `public/` folder
4. Verify they exist before proceeding with APK build

**Quick Options:**
- Use https://favicon.io/favicon-generator/ (easiest)
- Use https://realfavicongenerator.net/
- Use Canva.com for custom design

**Branding Colors:**
- Navy Blue: #1e3a8a (background)
- Orange: #f97316 (text/icon)

### 2. Get Your Replit App URL

- Click "Webview" in Replit
- Copy the full URL (e.g., `https://your-repl.your-username.repl.co`)
- Save this URL - you'll need it for the APK build process

### 3. Test Your PWA

Before building APK:
- [ ] Open your Replit app URL in Chrome mobile
- [ ] Verify all calculator functions work
- [ ] Test offline functionality (turn off internet, reload)
- [ ] Check that manifest.json is accessible at: `your-url/manifest.json`

### 4. Choose Build Method

Read `APK_BUILD_GUIDE.md` and decide:
- **PWABuilder** (easiest, recommended for beginners)
- **Bubblewrap CLI** (advanced, full control, Play Store ready)

## Build Status Checklist

- [ ] PNG icons created and placed in public/ folder
- [ ] Replit app URL obtained
- [ ] PWA tested and working correctly
- [ ] Build method chosen
- [ ] Ready to follow APK_BUILD_GUIDE.md

## What Happens If You Skip Icon Creation?

- PWABuilder will fail or generate app without icons
- Bubblewrap build will fail with error
- App will install but show blank/default icon
- Play Store will reject submission

**DO NOT PROCEED** with APK build until icons are created!
