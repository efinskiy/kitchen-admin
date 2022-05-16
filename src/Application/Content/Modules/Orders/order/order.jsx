import React from 'react';
import { cancelOrder, closeOrder, confirmOrder, getNotCompleted } from '../../../../../Services/order';
import Product from './order.element/order.element';
import css from './order.module.css';


const   Order = (props) => {
    const {order, setOrders} = props;

    function statusSwitch(status){
        switch (status) {
            case 0:
                return <span className={css.statusWaitPayment}>Ожидает оплаты</span>
            case 1:
                return <span className={css.statusWaitConfirmation}>Подтверждение</span>
            case 2:
                return <span className={css.statusReady}>Ожидает вручения</span>
            case 3:
                return <span className={css.statusFinal}>Выдан</span>
            case 4:
                return <span className={css.statusCanceled}>Отменен</span>
        }
    }

    return (
        <div className={css.order}>
            <div className={css.order_info}>
                <div className={css.info_top}>
                    <div className={css.info_main}>
                    <h3>
                        Заказ №{order.id}
                    </h3>
                    <span className={css.order_status}>
                        {statusSwitch(order.status)}
                    </span>
                    </div>
                    <span className={css.info_date}>{order.date}</span>
                    {
                        order.status === 2 
                                        ? <span className={css.info_pin}>PIN: {order.confirmation_code}</span>
                                        : false
                    }
                </div>
            </div>
            <div className={css.itemsList}>
                {order.items.map(item => <Product key={item.id} item={item}/>)}
            </div>
            <p>Способ оплаты: {order.payment_type === 0 ? <span className={css.total}>Наличными</span> : <span className={css.total}>Картой</span>}</p>
            
            <div className={css.totalBlock}>
            <p>Сумма: <span className={css.total}>{order.ord_price.toFixed(2)}₽</span></p>

            </div>
            <div className={css.controlButtons}>
                {
                    order.status !== 4 && order.status !== 3
                                                        ? <div className={css.btnCancel} onClick={()=> {cancelOrder(order.id).then(()=>{getNotCompleted().then((json) => setOrders(json))})}}> <p className={css.button_text}>Отменить</p> </div>
                                                        : false
                }
                {
                    order.status === 1 
                    ? <div className={css.btnConfirm} onClick={()=> {confirmOrder(order.id).then(()=>{getNotCompleted().then((json) => setOrders(json))})}}> <p className={css.button_text}>Подтвердить</p></div>
                    : false 
                }
                {
                    order.status === 2 
                    ? <div className={css.btnClose} onClick={()=> {closeOrder(order.id).then(()=>{getNotCompleted().then((json) => setOrders(json))})}}> <p className={css.button_text}>Завершить</p></div>
                    : false 
                }
                
            </div>
            <hr className={css.hr}/>
        </div>
    );
}

export default Order;
