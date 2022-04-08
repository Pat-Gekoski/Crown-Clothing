import { initializeApp } from 'firebase/app'
import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
	onAuthStateChanged
} from 'firebase/auth'
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

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
   prompt: 'select_account',
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
   if (!userAuth) return

   const userDocRef = doc(db, 'users', userAuth.uid)

   const userSnapshot = await getDoc(userDocRef)

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth
      const createdAt = new Date()
      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInfo,
         })
      } catch (error) {
         console.log('error creating the user', error.message)
      }
   }

   return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return

   return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return

   return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
