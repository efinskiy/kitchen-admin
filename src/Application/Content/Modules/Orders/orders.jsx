import React from 'react';
import css from './orders.module.css';
import Order from './order/order';

const Orders = (props) => {
    const {ordersState} = props;
    const [orders, ordersSet] = ordersState; 

    return (
        <div className='orders'>
            <h3>Активные заказы</h3>
            <div className={css.activeOrders}>
            {
                orders.orders.map(order => <Order order={order}/>)
            }
            </div>
        </div>
    );
}

export default Orders;
