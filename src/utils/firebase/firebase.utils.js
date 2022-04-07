import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
   apiKey: 'AIzaSyCSEYDv8rS3xmv0Bl5VZ6rNfwduk7YcxVU',
   authDomain: 'crown-clothing-44071.firebaseapp.com',
   projectId: 'crown-clothing-44071',
   storageBucket: 'crown-clothing-44071.appspot.com',
   messagingSenderId: '403837064123',
   appId: '1:403837064123:web:a39e2bba67b7840af5ea9e',
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
   prompt: 'select_account',
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid)

	const userSnapshot = await getDoc(userDocRef)

	if (!userSnapshot.exists()){
		const {displayName, email} = userAuth
		const createdAt = new Date()
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt
			})
		} catch (error) {
			console.log("error creating the user", error.message)
		}
	}

	return userDocRef
}
