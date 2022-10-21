import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import app from './firebase.init'
import { useState } from 'react';

const auth = getAuth(app)

function App() {
const [user, setUser] =useState({})

const provider = new GoogleAuthProvider();
const gitHupProvider = new GithubAuthProvider();

//handle SignIn with Google
const handleSignIn =()=>{
  signInWithPopup(auth, provider)
  .then(result =>{
    const user = result.user
      setUser(user)
      console.log(user.photoURL
        )
  })
}

//handle SignIn with Github

const handleSignInGithub =()=>{
  signInWithPopup(auth,gitHupProvider)
  .then(result=>{
     const user = result.user
     console.log(user)
  })
  .catch(error=>{
    console.log(error)
  })
}



const handleSignOut =()=>{
  signOut(auth)
  .then(()=>{
    setUser({})
  })
  .catch(error=>{
    setUser({})
  })
}


  return (
    <div className="App">
    {  user.uid ?  <button onClick={handleSignOut}>logOut</button> :
     <>
     <button onClick={handleSignIn} style={{'margin': '20px'}} >LogIn</button>
     <button onClick={handleSignInGithub}>LoginWithGithub</button>
     </>
    }
     <h2> name: {user.displayName}</h2>
     <h5>email : {user.email}</h5>
     <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
