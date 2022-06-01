import React, { useCallback } from 'react';
import Loader from './Loader/loader';
import css from './application.module.css';
import Content from './Content/content';
import { Footer } from './Footer/footer';
import { useState, useEffect, useRef } from 'react';



const Application = (props) => {
    const {auth, socket} = props;
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

    const checkLength = useCallback((response) => {
        return response.orders.length > orders.orders.length
    }, [orders]);

    const setOrdersListner = (response) => {
        if (checkLength(response)){
            setOrders(response);
            console.log(response, orders);
        }
      };
    
    useEffect(() => {
        socket.on("sendingNotCompleted", setOrdersListner);
    }, [])

    useEffect(() => {
        const interval = setInterval( () => {
            if (socket){
                socket.emit('fetchNotCompleted')
            }
        }, 1000)
        return () => clearInterval(interval);
      }, []);


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
