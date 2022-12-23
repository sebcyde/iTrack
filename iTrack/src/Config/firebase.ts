import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDLwwW5C8Cafw0rhqLUkeybG5L6ArQecpA',
	authDomain: 'itrack-d59ab.firebaseapp.com',
	projectId: 'itrack-d59ab',
	storageBucket: 'itrack-d59ab.appspot.com',
	messagingSenderId: '942519929928',
	appId: '1:942519929928:web:f0aa377e2dfaa86d8bdc7d',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
