import React from 'react';
import css from './history.module.css';
import { isLoaded } from '../../utils';
import Loader from '../../../Loader/loader';
import { useEffect, useState } from 'react';
import { historyOrders } from '../../../../Services/order';
import Order from '../Orders/order/order';

const History = () => {
    const [history, setHistory] = useState()

    useEffect(() => {
        historyOrders().then(json => setHistory(json))
    }, [])

    return (
        isLoaded(history)?
        <div className={css.ordersHistory}>
            <h3 className={css.ordersTitle}>История заказов</h3>
            <div className={css.activeOrders}>
            {
                history.orders.length === 0 ?
                <p>Заказы отсутствуют</p>
                :
                history.orders.map(order => <Order order={order} setOrders = {setHistory}/>)
            }
            </div>
        </div>
        : <Loader/>
    );
}

export default History;
