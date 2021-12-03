// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch } from 'firebase/firestore';
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
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Setup Google auth
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// Check if a user is already signed in
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
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

    const userRef = doc(firestore, `users/${userAuth.uid}`);
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
            console.error('Error creating user: ', error.message);
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(firestore, collectionKey);

    const batch = writeBatch(firestore);
    objectsToAdd.forEach((obj) => {
        const newDocRef = doc(collectionRef);
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshopToMap = (collection) => {
    const transformedCollection = collection.docs.map((doc) => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};
