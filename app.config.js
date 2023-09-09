import "dotenv/config"
export default {
  "expo": {
    "name": "WorkIt",
    "slug": "WorkIt",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#dd2c00"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "package": 'com.petra.workit',
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#dd2c00"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
      extra : {
        "eas": {
          "projectId": "60fef6e6-3b9a-477b-a0ef-406c114ee8b8"
        },
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
    }
  }
}
