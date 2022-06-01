import React from 'react';
import css from './orders.module.css';
import Order from './order/order'
import { useState, useEffect } from 'react';
import {getNotCompleted} from '../../../../Services/order';
import Loader from '../../../Loader/loader';
import { isLoaded } from '../../utils';

const Orders = (props) => {
    const {ordersState} = props;
    const [orders, setOrders] = ordersState;

    // const isLoaded = () =>{
    //     if (orders !== undefined){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }




    return (
        isLoaded(orders) === true ?
        <div className='orders'>
            <h3 className={css.ordersTitle}>Активные заказы</h3>
            <div className={css.activeOrders}>
            {
                orders.orders.length === 0 ?
                <p>Активные заказы отсутствуют</p>
                :
                orders.orders.map(order => <Order key={order.id} order={order} setOrders = {setOrders}/>)
            }
            </div>
        </div>
        : <Loader/>
    );
}

export default Orders;
