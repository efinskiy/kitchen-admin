import logo from './logo.svg';
import './App.css';
import Auth from './Auth/auth';
import { useState, useEffect } from 'react';
import { getCurrentUser } from './Services/auth';
import Application from './Application/application';


function App() {
  const [authState, setAuthState] = useState();
  const [loading, setLoading] = useState({loaded: false});
  
  useEffect(() => {
    getCurrentUser().then((json) => {
      setAuthState(json)})
    return () => {
      setLoading({loaded: true});
    };
  }, []);

  return (
    <div>
      {
        loading.loaded === true && authState !== undefined ?
            authState.is_anonymous === true ? <Auth auth={[authState, setAuthState]}/> 
            : <Application/>
          : <p>Loading...</p>
      }
    </div>
  );
}

export default App;
