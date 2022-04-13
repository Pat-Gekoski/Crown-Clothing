import { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'

import {
   signInAuthUserWithEmailAndPassword,
   signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'

import {SignInContainer, Title, ButtonContainer} from './sign-in-form.styles'

const defaultFormFields = {
   email: '',
   password: '',
}

const SignInForm = () => {
   const [formFields, setFormFields] = useState(defaultFormFields)
   const { email, password } = formFields

   const resetFormFields = () => {
      setFormFields(defaultFormFields)
   }

   const signInWithGoogle = async () => {
      await signInWithGooglePopup()
   }

   const handleSubmit = async (event) => {
      event.preventDefault()

      try {
         const { user } = await signInAuthUserWithEmailAndPassword(email, password)
         resetFormFields()
      } catch (error) {
         switch (error.code) {
            case 'auth/wrong-password':
               alert('incorrect password for email')
               break
            case 'auth/user-not-found':
               alert('no user associated with this email')
               break
            default:
               console.log(error)
         }
      }
   }

   const handleChange = (event) => {
      const { name, value } = event.target

      setFormFields({ ...formFields, [name]: value })
   }

   return (
      <SignInContainer>
         <Title>Already have an account?</Title>
         <span>Sign in with your email and password</span>
         <form onSubmit={handleSubmit}>
            <FormInput
               label="Email"
               type="email"
               required
					autoComplete="email"
               onChange={handleChange}
               name="email"
               value={email}
            />

            <FormInput
               label="Password"
               type="password"
               required
					autoComplete="password"
               onChange={handleChange}
               name="password"
               value={password}
            />
            <ButtonContainer>
               <Button type="submit">Sign In</Button>
               <Button
                  buttonType={BUTTON_TYPE_CLASSES.google}
                  type="button"
                  onClick={signInWithGoogle}
               >
                  Google sign in
               </Button>
            </ButtonContainer>
         </form>
      </SignInContainer>
   )
}

export default SignInForm
