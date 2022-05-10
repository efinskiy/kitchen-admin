import React from 'react';
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../Services/auth';
import { getNotCompleted } from '../Services/order';
import Loader from './Loader/loader';
import { Footer } from './Footer/footer';
import css from './application.module.css';
import Content from './Content/content';

const Application = (props) => {
    const {auth} = props;

    const [user, setUser] = auth;
    const [orders, setOrders] = useState();
    const [fswitch, setfSwitch] = useState({orders: true, products: false, settings: false, categories: false})

    useEffect(() => {
        getNotCompleted().then((json) => {
            setOrders(json)
        })
    }, []);

    return (
        <div className={css.application}>

            {
                user !== undefined && orders !== undefined ?
                    [
                    <Content 
                        switchprops={[fswitch, setfSwitch]} 
                        ordersState={[orders, setOrders]}
                    />,
                    <Footer switchprops={[fswitch, setfSwitch]}/>
                    ]
                :
                    <Loader/>
            }

        </div>
    );
}

export default Application;
