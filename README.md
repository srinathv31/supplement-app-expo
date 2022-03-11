# Project Asceplius
This is the codebase for the Supplement App, Vital (final name pending) [App Store Link](https://apps.apple.com/us/app/supplementapp/id1612971376). 

It helps users track and organize supplement, exercise, food, and water intake. Along with providing a one-stop-shop for, "researched and up-to-date" information on supplements.
### Beta Invite - https://docs.google.com/forms/d/1v5-KyHnOMVaSlnyx3vvoeis8ReU-gdKghMWqVGyX2GI/edit
(if you would like to test and be involved in the future development of this app)

# Technologies
This project is built using **React Native**, **Typescript**, and **Firebase** (Cloud Saving, Social Authentication, In-App Messaging, Campaign Push Notifications, Analytics). **Eslint** to keep uniform code style.

Using **App Store Connect** to release the app on iOS devices/App Store.

**TestFlight** (through App Store Connect) - to beta test app with select users (up to 10,000 users).

# Workflow
The "Projects" tab holds the kanban boards "SupplementApp MVP" [CLOSED] and "SupplementApp Beta"

Features, bugs, and other tasks are broken up into cards (issues) with relevant information, pictures and pull requests tagged to them. These cards are then organized from To-Do -> In-Progress -> Done, automatically as pull requests are merged to the main.

After PRs are merged, I created a github Actions **(.github/workflows/build.yml)** that:  
***First*** (install and test): installs all npm packages, checks eslint, and runs tests  
***Second*** (build-android): builds Android Release and creates an "app-release.apk" file that can be used to run the app on any android device

# Customer Discovery
* Using **Google Forms** to invite users to the beta to test new features and build a list of potential customers.
* Posting on popular subreddits on reddit.com: r/Supplements, r/reactnative

# Packages Used (npm)
### React-native Packages:
* @react-native-async-storage/async-storage
* react-native-tab-view
* react-native-webview
* victory-native
* @react-native-community/datetimepicker
* @react-native-community/slider
* react-native-calendars
* react-native-dropdown-picker
* react-native-gesture-handler
* react-native-image-picker
* react-native-linear-gradient
* react-native-modal
* react-native-modalize
* react-native-onboarding-swiper
* react-native-pager-view
* react-native-progress
* react-native-share
* react-native-swipe-gestures
* react-native-toast-message
* react-native-vector-icons
* rn-tooltip

### Firebase and Authentication Packages
* @react-native-firebase/app
* @react-native-firebase/analytics
* @react-native-firebase/auth
* @react-native-firebase/firestore
* @react-native-firebase/in-app-messaging
* @react-native-firebase/messaging
* @react-native-google-signin/google-signin
* @invertase/react-native-apple-authentication
