/* 
	Useful links:
		- https://firebase.google.com/docs/auth/web/password-auth?authuser=0#web
		- https://firebase.google.com/docs/auth/web/start?authuser=0
		- https://firebase.google.com/docs/auth/web/google-signin
*/

import './App.css'
import { useState, useRef, useEffect } from 'react'
import FirebaseWebApp from './config/firebase-config.js'
import { getAuth, 
		GoogleAuthProvider,
		signInWithPopup,
		signOut,
		onAuthStateChanged } from "firebase/auth";

const auth = getAuth(FirebaseWebApp);
const googleProvider = new GoogleAuthProvider();
	
function App() {
	const [appUser, setAppUser] = useState(null);
	const signInButton = useRef(null);
	const signOutButton = useRef(null);

	// starts the auth state listener when component first mounts
	// when component unmounts turns off listener
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => { // runs this callback each time state changes
			setAppUser(user);
		})
		
   		return unsubscribe;
	}, []);

	// for understanding
	useEffect(() => {
		console.log(appUser);
	}, [appUser]);

	const handleSignIn = async () => {
    	// implement functionality to sign in with firebase auth
    	try {
    		const result = await signInWithPopup(auth, googleProvider);
			const cred = GoogleAuthProvider.credentialFromResult(result);
			console.log(auth.currentUser.uid);
			console.log('Signed in yayayayay!');
    	} catch (error) { console.error(error) }
    }

	const handleSignOut = async () => {
		// implement functionality to sign out with firebase auth
		try {
			await signOut(auth); // signs out unconditionally
			console.log('Signed out lets go!');
		} catch (error) { console.error(error) }
	}

  	return (
  	  <div className="App">
		<button ref={signInButton} onClick={handleSignIn}>Sign In</button>
		<button ref={signOutButton} onClick={handleSignOut}>Sign Out</button>
  	  </div>
  	);
}

export default App;
