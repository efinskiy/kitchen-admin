import logo from './logo.svg';
import './App.css';
import Auth from './Auth/auth';
import { useState, useEffect } from 'react';
import { getCurrentUser } from './Services/auth';
import Application from './Application/application';
import Loader from './Application/Loader/loader';
import io from 'socket.io-client'



function App() {
  const [authState, setAuthState] = useState();
  const [loading, setLoading] = useState({loaded: false});
  const [socket, setSocket] = useState();
  const socketUrl = "http://admin.stolovaya.online";


  
  useEffect(() => {
    getCurrentUser().then((json) => {
      setAuthState(json)}).finally( () => setSocket(io.connect(socketUrl, { rejectUnauthorized: false }))).then(() => setLoading({loaded: true}));
  }, []);

  return (
    <>
      {
        // Грязь. Ждем когда дойдут промисы с данными
        loading.loaded === true && authState !== undefined && socket !== undefined ?
            authState.is_anonymous === true 
            ? <Auth auth={[authState, setAuthState]}/> 
            : <Application auth={[authState, setAuthState]} socket={socket}/>
          : <Loader/>
      }
    </>
  );
}

export default App;
