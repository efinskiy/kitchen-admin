import React from 'react';
import Loader from './Loader/loader';
import css from './application.module.css';
import Content from './Content/content';
import { Footer } from './Footer/footer';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'



const Application = (props) => {
    const {auth} = props;
    const [user, setUser] = auth;
    const [fswitch, setfSwitch] = useState({orders: true, products: false, settings: false, categories: false})
    const [additionalFooter, setAdditionalFooter] = useState({orders: false, products: false, settings: false, categories: false})
    const [tabsState, setTabsState] = useState({
        ordersCurrent: true, 
        ordersPast: false,
        productsWarehouse: false,
        productsAdd: false, 
        settingsMain: false, 
        settingsUsers: false, 
        settingsPayments: false
    })

    const [socketMessages, setSocketMessages] = useState([]);


    const socketUrl = "https://admin.stolovaya.online/socket.io";
    const roomId = 'admin';
    const socketRef = useRef(null)

    useEffect(() => {
        socketRef.current = io(socketUrl)

          socketRef.current.emit('info', JSON.stringify({'status': 'connected'}))

          socketRef.current.on('connectConfirm', (message) => {
              console.log(message)
          })
        
        
          return () => {
            socketRef.current.disconnect()
        };
    }, []);
    


    return (
        <div className={css.application}>

            {
                user !== undefined ?
                    [
                    <Content switchprops={[fswitch, setfSwitch]} user = {user} tabs= {tabsState}/>,
                    <Footer switchprops={[fswitch, setfSwitch]} tabsprops={[tabsState, setTabsState]} addprops={[additionalFooter, setAdditionalFooter]} userstate={[user, setUser]}/>
                    ]
                :
                    <Loader/>
            }

        </div>
    );
}

export default Application;
