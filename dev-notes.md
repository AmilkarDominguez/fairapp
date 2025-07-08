Generate android projects
# Dev Notes

First, install the @capacitor/android package.

`npm install @capacitor/android`

Building Android projects with Capacitor

`npm run build`

Then, add the Android platform to your project:

`npx cap add android`

## Opening the Android Project
To open the project in Android Studio, run:

`npx cap open android`

## Syncing Changes
After making changes to your web assets or configuration, you need to sync them with the Android project:

`npx cap sync android`
