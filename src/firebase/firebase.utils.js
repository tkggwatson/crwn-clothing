// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyB_0M-S9qcBezdvtxFuQLoUVJfkBoKQQ2c',
    authDomain: 'crwn-db-2ab71.firebaseapp.com',
    projectId: 'crwn-db-2ab71',
    storageBucket: 'crwn-db-2ab71.appspot.com',
    messagingSenderId: '251843234989',
    appId: '1:251843234989:web:0b06746bbd4682fc0bca24',
    measurementId: 'G-NC7H6SCJFT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line
const analytics = getAnalytics(app);
const auth = getAuth();
const firestore = getFirestore();

// Setup Google auth
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// Sign in/out callback
export const onUserAuthStateChanged = (callback) => {
    return onAuthStateChanged(auth, callback);
};

// Sign out helper
export const signOutFromFirebase = () => {
    signOut(auth);
};

// Create a new user profile
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return;
    }

    console.log(userAuth);
    const userRef = doc(firestore, `users/${userAuth.uid}`);
    console.log(userRef);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log('Error creating user: ', error.message);
        }
    }

    return userRef;
};
