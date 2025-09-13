/* 
	Useful links:
		- https://firebase.google.com/docs/auth/web/password-auth?authuser=0#web
		- https://firebase.google.com/docs/auth/web/start?authuser=0
*/

import './App.css'
import { useState, useRef, useEffect } from 'react'
import FirebaseWebApp from './config/firebase-config.js'
import { getAuth, 
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		signOut,
		onAuthStateChanged } from "firebase/auth";

const auth = getAuth(FirebaseWebApp);
	
function App() {
	const [appUser, setAppUser] = useState(null);
	const [email, setEmail] = useState('');	
	const [password, setPassword] = useState('');
	const createAccountButton = useRef(null);
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

	useEffect(() => {
		console.log(appUser);
	}, [appUser]);

	const handleCreateAccount = async () => {
		// implement functionality to create account with firebase auth
		// remember to set password policy in firebase console

		// (1) make a validatePassword() function in firebase-utils.js etc that
		// validates password on account creation (should be === to password policy)
		// didn't do that in this example
		if (!email || !password) return;
	
		// (2) create new user with email and password given 
		try {
			createUserWithEmailAndPassword(auth, email, password);
			console.log('Created a new account lets goo');
		} catch (error) { console.error(error.message) }
		finally {
			setEmail('');
			setPassword('');
		}
	}

	const handleSignIn = async () => {
    	// implement functionality to sign in with firebase auth
    	try {
    		await signInWithEmailAndPassword(auth, email, password);
			console.log('Signed in yayayayay!');
    	} catch (error) { console.error(error.message) }
    	finally {
    		setEmail('');
    		setPassword('');
    	}
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
  	  	<input 
			type='email'
			value={email} 
			placeholder='Email...' 
			onChange={ (event) => setEmail(event.target.value) }
		/>
  	  	<input 
			type='password'
			value={password} 
			placeholder='Password...' 
			onChange={ (event) => setPassword(event.target.value) }
		/>
		<button ref={createAccountButton} onClick={handleCreateAccount}>Create Account</button>
		<button ref={signInButton} onClick={handleSignIn}>Sign In</button>
		<button ref={signOutButton} onClick={handleSignOut}>Sign Out</button>
  	  </div>
  	);
}

export default App;
