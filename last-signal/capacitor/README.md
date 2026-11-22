# Last Signal — Android APK (Capacitor)

Wraps the game (`../index.html`) into a native Android app.

## Requirements

- Node.js 18+
- Android Studio (or just the Android SDK + JDK 17 with `ANDROID_HOME` set)

## Build a debug APK

```bash
cd last-signal/capacitor
npm install

# 1. copy the game into www/ (no deps needed)
npm run copy-game

# 2. create the native Android project (first time only)
npx cap add android

# 3. sync web assets + config
npx cap sync

# 4a. open in Android Studio -> Build > Build APK(s)
npx cap open android

# 4b. or headless:
cd android && ./gradlew assembleDebug
```

APK output:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

Transfer it to a phone (or `adb install app-debug.apk`) and install.

## Release APK / Play Store bundle

1. Create a keystore once:

   ```bash
   keytool -genkey -v -keystore last-signal.keystore -alias lastsignal \
     -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Add to `android/app/build.gradle`:

   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file("../../last-signal.keystore")
               storePassword System.getenv("KS_PASS")
               keyAlias "lastsignal"
               keyPassword System.getenv("KEY_PASS")
           }
       }
       buildTypes { release { signingConfig signingConfigs.release } }
   }
   ```

3. Build:

   ```bash
   ./gradlew assembleRelease        # APK
   ./gradlew bundleRelease          # .aab for Play Store
   ```

## Updating the game

The game source lives at `last-signal/index.html` (the `capacitor/www` folder is
generated and git-ignored). After any edit:

```bash
npm run sync
```

then rebuild. Bump the `CACHE_NAME` in `sw.js` if you also use the PWA install
path, so browsers pick up the new assets.
