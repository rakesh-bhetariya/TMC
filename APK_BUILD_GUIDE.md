# InfraOne TMT Calculator - APK Build Guide

Complete guide to convert your PWA to an Android APK file.

## IMPORTANT: Icons Required Before Building

**WARNING:** The manifest.json currently references `icon-192.png` and `icon-512.png` which DO NOT exist yet. You MUST create these PNG icon files before building your APK, otherwise the build will fail or produce an app without icons.

Follow the instructions in `public/icon-guide.md` to create the required icons, then place them in the `public/` folder.

## Prerequisites

### Before You Start:

1. **Get Your Replit App URL**
   - Click the "Webview" button in Replit
   - Copy the full URL (e.g., `https://your-repl-name.your-username.repl.co`)
   - OR if published, use your custom domain

2. **Create PNG Icons** (REQUIRED!)
   - See `public/icon-guide.md` for detailed instructions
   - You MUST create `icon-192.png` and `icon-512.png`
   - Place them in the `public/` folder
   - Use InfraOne colors: Navy Blue (#1e3a8a) and Orange (#f97316)

3. **Verify PWA is Working**
   - Open your Replit app URL in Chrome mobile
   - Check that it loads correctly
   - Test offline functionality

---

## METHOD 1: PWABuilder (Easiest - Recommended for Beginners)

**Time Required:** ~15 minutes  
**Skill Level:** Beginner  
**Output:** Signed APK ready for installation

### Step-by-Step Instructions:

1. **Visit PWABuilder**
   ```
   Go to: https://www.pwabuilder.com
   ```

2. **Enter Your App URL**
   - Paste your Replit app URL
   - Click "Start" or "Analyze"

3. **Review PWA Score**
   - PWABuilder will analyze your app
   - Should show green checkmarks for manifest and service worker
   - If any issues, fix them and re-analyze

4. **Generate Android Package**
   - Click "Package for Stores" or "Build"
   - Select "Android" platform
   - Choose "Trusted Web Activity" (TWA)

5. **Configure App Details**
   - **App Name:** InfraOne TMT Calculator
   - **Package ID:** `com.infraone.tmtcalc` (or your preference)
   - **App Version:** 1.0.0
   - **Host URL:** Your Replit app URL
   - Leave other settings as default

6. **Generate Signing Key**
   - PWABuilder will generate a signing key for you
   - **IMPORTANT:** Download and save the keystore file securely
   - Save the keystore password

7. **Download APK**
   - Click "Download" or "Generate Package"
   - You'll get a ZIP file containing:
     - `app-release-signed.apk` (install this on Android)
     - Source code (for reference)
     - Keystore (for future updates)

8. **Install on Android Device**
   ```bash
   # Transfer APK to your phone via USB or cloud storage
   # On Android: Enable "Install Unknown Apps" for your file manager
   # Tap the APK file to install
   ```

### Testing:
- Install on your Android device
- Open the app (should show InfraOne icon)
- Test offline: Turn off WiFi/data and verify it works
- Check all features: calculator, history, share

---

## METHOD 2: Bubblewrap CLI (Advanced - Full Control)

**Time Required:** ~30-45 minutes  
**Skill Level:** Intermediate/Advanced  
**Output:** APK + AAB (for Play Store) + Full Android project

### Prerequisites:
```bash
# Install Node.js (if not already installed)
# Install Bubblewrap CLI globally
npm install -g @bubblewrap/cli

# Verify installation
bubblewrap --version
```

### Step-by-Step Instructions:

#### 1. Initialize TWA Project

```bash
# Create a new directory for your Android project
mkdir infraone-twa
cd infraone-twa

# Initialize Bubblewrap project
bubblewrap init --manifest https://your-repl-url.repl.co/manifest.json
```

#### 2. Answer Configuration Prompts

The CLI will ask you several questions:

```
? Domain being opened in the TWA: 
  → your-repl-name.your-username.repl.co

? URL path to open in the TWA: 
  → /

? Application name: 
  → InfraOne TMT Calculator

? Android application ID (packageId): 
  → com.infraone.tmtcalc

? Display mode: 
  → standalone

? Status bar color: 
  → #1e3a8a

? Navigation bar color: 
  → #1e3a8a

? Orientation: 
  → portrait

? Icon URL (512x512): 
  → https://your-repl-url.repl.co/icon-512.png

? Maskable icon URL (optional): 
  → [Leave blank or use same URL]

? Monochrome icon URL (optional): 
  → [Leave blank]

? Shortcuts (optional): 
  → [Leave blank]

? Create keystore now? 
  → Yes

? Keystore password: 
  → [Enter a secure password - SAVE THIS!]

? Key password: 
  → [Use same password as keystore]
```

#### 3. Build the APK

```bash
# Build signed APK and AAB
bubblewrap build

# Output files will be in:
# - app-release-signed.apk (for direct installation)
# - app-release-bundle.aab (for Google Play Store)
```

#### 4. Extract SHA-256 Fingerprint (for Digital Asset Links)

```bash
# Get your app's SHA-256 fingerprint
keytool -list -v -keystore android.keystore -alias android

# Look for "SHA256:" in the output
# Copy the fingerprint (format: XX:XX:XX:XX:...)
```

#### 5. Update Digital Asset Links

Edit `public/.well-known/assetlinks.json`:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.infraone.tmtcalc",
      "sha256_cert_fingerprints": [
        "XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX"
      ]
    }
  }
]
```

Replace `package_name` and `sha256_cert_fingerprints` with your actual values.

#### 6. Deploy Asset Links to Your Server

- Commit and push the `assetlinks.json` file
- Verify it's accessible at: `https://your-repl-url.repl.co/.well-known/assetlinks.json`
- This removes the browser bar from your TWA (makes it truly "native")

#### 7. Install and Test

```bash
# Connect Android device via USB with USB debugging enabled
adb devices

# Install APK
adb install app-release-signed.apk

# Or transfer APK to phone and install manually
```

#### 8. Update App (Future Changes)

```bash
# Update manifest or configuration
bubblewrap update

# Rebuild
bubblewrap build

# Reinstall
adb install -r app-release-signed.apk
```

---

## Digital Asset Links Setup (For Full-Screen TWA)

This removes the browser address bar, making your app look truly native.

### 1. Complete Asset Links File

The file is already created at `public/.well-known/assetlinks.json`

You need to:
1. Replace `REPLACE_WITH_YOUR_PACKAGE_NAME` with your package ID (e.g., `com.infraone.tmtcalc`)
2. Replace `REPLACE_WITH_YOUR_SHA256_FINGERPRINT` with your actual fingerprint

### 2. Get SHA-256 Fingerprint

**From PWABuilder:**
- It's in the downloaded ZIP file documentation

**From Bubblewrap:**
```bash
keytool -list -v -keystore android.keystore -alias android
```

### 3. Verify Asset Links

Once deployed, test at:
```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://your-repl-url.repl.co&relation=delegate_permission/common.handle_all_urls
```

Should return your asset links JSON.

---

## Installing APK on Android Device

### Option 1: USB Transfer
```bash
# Connect phone via USB
adb install app-release-signed.apk
```

### Option 2: Cloud Transfer
1. Upload APK to Google Drive, Dropbox, or any cloud storage
2. Download on your Android device
3. Enable "Install Unknown Apps" for your browser/file manager
4. Tap the APK to install

### Option 3: Direct Download
1. Host the APK on your server or GitHub Releases
2. Open link on Android device
3. Download and install

---

## Testing Checklist

After installing the APK:

- [ ] App icon appears on home screen
- [ ] App opens without browser UI
- [ ] All TMT calculator features work
- [ ] Can add items and calculate weight
- [ ] Can enter base price and see cost
- [ ] Can save to history
- [ ] Can share as JPG image
- [ ] Offline functionality works (turn off internet)
- [ ] App loads from cache when offline
- [ ] Customer info saves correctly

---

## Publishing to Google Play Store (Optional)

### Requirements:
1. **Google Play Developer Account** ($25 one-time fee)
2. **AAB file** (from Bubblewrap method)
3. **Privacy Policy URL**
4. **App screenshots** (at least 2)

### Steps:
1. Create app in Google Play Console
2. Upload `.aab` file (NOT `.apk`)
3. Add app details, screenshots, description
4. Set up privacy policy
5. Complete content rating questionnaire
6. Submit for review

### App Store Listing Suggestions:

**Title:** InfraOne TMT Calculator

**Short Description:**
Professional TMT steel bar weight and cost calculator for construction sites

**Full Description:**
```
InfraOne TMT Calculator is a professional tool for construction professionals to:

- Calculate TMT steel bar weight from Bhari (bundles) or individual bars
- Get accurate cost estimates with diameter-specific pricing
- Save customer information and delivery addresses
- Track estimate history
- Share estimates as JPG images via WhatsApp or email

Features:
- Supports all TMT diameters (8mm to 32mm)
- Accurate weight calculations per specification
- Smart rounding for realistic delivery quantities
- Offline functionality - works without internet
- Professional estimate generation with branding
- History tracking with save/reload functionality

Perfect for construction sites, TMT dealers, contractors, and engineers.
```

**Keywords:** TMT calculator, steel calculator, rebar calculator, construction calculator, weight calculator

---

## Updating Your App

### For Code/Content Changes:
- No APK update needed!
- Your PWA content updates automatically
- Users see changes on next app launch

### For Manifest/Icon Changes:
1. Rebuild APK with same package ID
2. Increment version code
3. Reinstall (or update via Play Store)

---

## Troubleshooting

### Issue: App shows browser bar
**Solution:** Verify Digital Asset Links are properly configured and accessible

### Issue: Icons don't appear
**Solution:** Ensure icon-192.png and icon-512.png exist in public/ folder

### Issue: App won't install
**Solution:** Check that "Install Unknown Apps" is enabled for your file manager

### Issue: App crashes on launch
**Solution:** Check the app URL is accessible and PWA is working correctly

### Issue: Offline doesn't work
**Solution:** Verify service worker is registered and caching properly

---

## Support Resources

- **Bubblewrap Docs:** https://github.com/GoogleChromeLabs/bubblewrap
- **PWABuilder Help:** https://docs.pwabuilder.com/
- **TWA Guide:** https://developers.google.com/web/android/trusted-web-activity
- **Digital Asset Links:** https://developer.android.com/training/app-links/verify-android-applinks

---

## Next Steps

1. Create PNG icons (see `public/icon-guide.md`)
2. Choose build method (PWABuilder or Bubblewrap)
3. Build your APK
4. Install and test on Android device
5. Configure Digital Asset Links (optional, for full-screen)
6. Consider publishing to Play Store (optional)

---

**Your app is now ready to become a native Android application!**
