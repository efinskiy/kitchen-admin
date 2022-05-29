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
    const [orders, setOrders] = useState({orders: []});



    const socketUrl = "http://admin.stolovaya.online";
    const setOrdersListner = (response) => {
        console.log(response);
        // if (response.orders.length > orders.orders.length) {console.log('new order')}
        // console.log(response.orders.length, orders.orders.length)
        // console.log(orders)
        setOrders(response)
      };

    const [socket, setSocket] = useState(io.connect(socketUrl, { rejectUnauthorized: false }));
    socket.on("sendingNotCompleted", setOrdersListner);

    useEffect(() => {
        const interval = setInterval( () => {
            socket.emit('fetchNotCompleted')
        }, 10000)
        
      }, []);


    return (
        <div className={css.application}>

            {
                user !== undefined ?
                    [
                    <Content switchprops={[fswitch, setfSwitch]} user = {user} tabs= {tabsState} ordersState={[orders, setOrders]}/>,
                    <Footer switchprops={[fswitch, setfSwitch]} tabsprops={[tabsState, setTabsState]} addprops={[additionalFooter, setAdditionalFooter]} userstate={[user, setUser]}/>
                    ]
                :
                    <Loader/>
            }

        </div>
    );
}

export default Application;
