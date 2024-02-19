// src/auth/firebase/firebase-config.js

import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from 'src/config-global';
import { getAuth } from 'firebase/auth';
// Initialize Firebase
const app = initializeApp(FIREBASE_API);

export default app;
export const auth = getAuth(app);
