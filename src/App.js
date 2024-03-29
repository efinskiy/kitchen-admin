import logo from './logo.svg';
import './App.css';
import Auth from './Auth/auth';
import { useState, useEffect } from 'react';
import { getCurrentUser } from './Services/auth';
import Application from './Application/application';
import Loader from './Application/Loader/loader';



function App() {
  const [authState, setAuthState] = useState();
  const [loading, setLoading] = useState({loaded: false});



  
  useEffect(() => {
    getCurrentUser().then((json) => {
      setAuthState(json)}).then(() => setLoading({loaded: true}));
  }, []);



  return (
    <>
      {
        // Грязь. Ждем когда дойдут промисы с данными
        loading.loaded === true && authState !== undefined ?
            authState.is_anonymous === true 
            ? <Auth auth={[authState, setAuthState]}/> 
            : <Application auth={[authState, setAuthState]}/>
          : <Loader/>
      }
    </>
  );
}

export default App;
