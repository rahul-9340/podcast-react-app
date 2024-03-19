import { useEffect, useState } from 'react'
import './App.css'
import {  BrowserRouter as Router,Routes,Route,} from 'react-router-dom'
import SignUp from './pages/SignUpPage'
import Profile from './pages/Profile'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { setUser } from './slice.js/userSlice'
import PrivateRoute from "./components/common/PrivateRoute"
import CreateAPodcast from './pages/CreateAPodcast'
import PodcastPage from './pages/Podcast'
import PodcastDetails from './pages/PodcastDetails'
import CreateAnEpisodePage from './pages/CreateAnEpisode'
function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(setUser({
                name: userData.name,
                email: userData.email,
                uid: userData.uid
              }));
            }
          },
          (error) => {
            console.error("Error fetching user data", error);
          }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);
  



  return (
   <div className='app'>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create-a-podcast' element={<CreateAPodcast/>}/>
        <Route path='/podcasts' element={<PodcastPage/>}/>
        <Route path='/podcast/:id' element={<PodcastDetails/>}/>
        <Route path='/podcast/:id/create-episodes' element={<CreateAnEpisodePage/>}/>
        </Route>
      </Routes>
    </Router>
   </div>
  )
}

export default App




