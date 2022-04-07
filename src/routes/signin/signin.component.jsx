import {
   signInWithGooglePopup,
   createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
   const logGoogleUser = async () => {
      try {
         const { user } = await signInWithGooglePopup()
         const userDocRef = await createUserDocumentFromAuth(user)
      } catch (err) {
         console.err('SignIn: ', 'logGoogleUser', err.message)
      }
   }

   return (
      <div>
         <h1>Sign In</h1>
         <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      </div>
   )
}

export default SignIn
