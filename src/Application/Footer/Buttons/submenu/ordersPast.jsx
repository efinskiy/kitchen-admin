import React from 'react';
import css from '../Buttons.module.css'
import classNames from 'classnames';

const OrdersPast = (props) => {
    const {switchprops, isActive, setTabsState, setAddF} = props
    const [fswitch, setfSwitch] = switchprops
    return (
            <button className={classNames(css.button, {[css.activeSub]: isActive})} onClick={() => {
                setTabsState(
                    {
                        ordersCurrent: false, 
                        ordersPast: true,
                        productsWarehouse: false,
                        productsAdd: false, 
                        productsCategories: false,
                        settingsMain: false, 
                        settingsUsers: false, 
                        settingsPayments: false
                    }
                    );
                setAddF({orders: false, products: false, settings: false, categories: false});
                setfSwitch({orders: true, products: false, settings: false, categories: false});
            
            }}>
            <img src="icons/light/archive.svg" height='30px' width='30px' alt="" />
            </button>
    );
}

export default OrdersPast;
