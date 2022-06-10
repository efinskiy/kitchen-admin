import React from 'react';
import css from './content.module.css';
import Settings from './Modules/Settings/settings';
import Orders from './Modules/Orders/orders';
import History from './Modules/History/history';
import Storage from './Modules/Storage/storage';
import Categories from './Modules/Categories/categories';
import Users from './Modules/Users/users';

const Content = (props) => {
    const {user, tabs, ordersState} = props;
    const [orders, setOrders] = ordersState;

    return (
        <div className={css.contentWrapper}>
            {
                tabs.ordersCurrent === true ? <Orders ordersState={[orders, setOrders]}/> :
                tabs.ordersPast === true ? <History/> :
                tabs.productsWarehouse === true ? <Storage/> :
                tabs.productsAdd === true ? <div>Добавить товар</div> :
                tabs.productsCategories === true ? <Categories/> :
                tabs.settingsMain === true ? <Settings user={user}/> : 
                tabs.settingsPayments === true ? <div>Защищенные настройки</div>:
                tabs.settingsUsers === true ? <Users currentUser={user}/> :
                false
            }
        </div>
    );
}

export default Content;
