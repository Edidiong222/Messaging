import { useState } from 'react'
import { auth } from './firebase'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import {useAuthState} from "react-firebase-hooks/auth"
import Chat from './Chat'
import './App.css'
import SignIn from './SignIn'

function App() {
  const [count, setCount] = useState(0)
  const [user] = useAuthState(auth)



  return (
    <>

    {user?<Chat/>:<SignIn/>}

   {/* <Router>
    <div>
      <nav>
        <Link to="/"><button>Chat</button></Link>
        <Link to='/sign'><button>SignUp</button></Link>
      </nav>
    </div>
    <Routes>
      <Route path="/sign" element={<SignIn/>}/>
      <Route path="/" element={<Chat/>}/>
    </Routes>
   </Router> */}
    </>
  )
}

export default App
