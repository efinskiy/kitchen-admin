import React from 'react';
import css from './content.module.css';
import Orders from './Modules/Orders/orders';
import Settings from './Modules/Settings/settings';

const Content = (props) => {
    const {switchprops, ordersState} = props;
    const [fswitch, setfSwitch] = switchprops;
    const [orders, setOrders] = ordersState;

    return (
        <div className={css.contentWrapper}>
            {
                fswitch.orders === true ? <Orders ordersState={[orders, setOrders]}/> :
                fswitch.settings === true ? <Settings/> : 
                false
            }
        </div>
    );
}

export default Content;
