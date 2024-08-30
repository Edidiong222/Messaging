import React from 'react'
import {auth} from './firebase'

import { getAuth,GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignIn = () => {
    function signInWithGoogle(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
      }
    
    
    
      return (
        <>
          <div className='App'>
            <h2>Reuby's Messaging app</h2>
              <button onClick={signInWithGoogle}>Sign in with Google</button>
    
          </div>
        </>
      )
}

export default SignIn
