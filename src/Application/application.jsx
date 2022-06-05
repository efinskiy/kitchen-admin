import React, { useCallback } from 'react';
import useSound from 'use-sound';
import Loader from './Loader/loader';
import css from './application.module.css';
import Content from './Content/content';
import { Footer } from './Footer/footer';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'
// import sfx from '../bell-sound.mp3';


const Application = (props) => {
    const {auth} = props;
    const [user, setUser] = auth;
    const [fswitch, setfSwitch] = useState({orders: true, products: false, settings: false, categories: false});
    const [additionalFooter, setAdditionalFooter] = useState({orders: false, products: false, settings: false, categories: false});
    const [play] = useSound('/bell-sound.mp3');
    const [tabsState, setTabsState] = useState({
        ordersCurrent: true, 
        ordersPast: false,
        productsWarehouse: false,
        productsAdd: false, 
        settingsMain: false, 
        settingsUsers: false, 
        settingsPayments: false
    });
    const [orders, setOrders] = useState({orders: []});

    const [socket, setSocket] = useState();
    const socketUrl = "http://admin.stolovaya.online";

    useEffect(()=> {
        setSocket(io.connect(socketUrl, { rejectUnauthorized: false }))
      }, [])

    const setOrdersListner = (response) => {
        if (response.orders.length > orders.orders.length){
            play();
            setOrders(response);
        }else if (response.orders.length < orders.orders.length){
            setOrders(response);
        }
      };
    
    useEffect(() => {
        if (socket!==undefined){
            socket.on("sendingNotCompleted", setOrdersListner);            
            return function cleanup (){
                socket.removeAllListeners('sendingNotCompleted');
                console.log('listeners cleanup')
            }    
        }
        
    }, [orders, socket])

    useEffect(() => {
        const interval = setInterval( () => {
            if (socket){
                socket.emit('fetchNotCompleted')
            }
        }, 1000)
        return () => clearInterval(interval);
      }, [socket]);


    return (
        <div className={css.application}>
            {
                user !== undefined ?
                    [
                    <Content key="content" switchprops={[fswitch, setfSwitch]} user = {user} tabs= {tabsState} ordersState={[orders, setOrders]}/>,
                    <Footer key="footer" switchprops={[fswitch, setfSwitch]} tabsprops={[tabsState, setTabsState]} addprops={[additionalFooter, setAdditionalFooter]} userstate={[user, setUser]}/>
                    ]
                :
                    <Loader/>
            }

        </div>
    );
}

export default Application;
