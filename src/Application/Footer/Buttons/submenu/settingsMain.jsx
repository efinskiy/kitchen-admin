import React from 'react';
import css from '../Buttons.module.css'
import classNames from 'classnames';

const SettingsMain = (props) => {
    const {switchprops, isActive, setTabsState, setAddF} = props
    const [fswitch, setfSwitch] = switchprops
    return (
            <button className={classNames(css.button, {[css.activeSub]: isActive})} onClick={() => {
                setTabsState(
                    {
                        ordersCurrent: false, 
                        ordersPast: false,
                        productsWarehouse: false,
                        productsAdd: false, 
                        productsCategories: false,
                        settingsMain: true, 
                        settingsUsers: false, 
                        settingsPayments: false
                    }
                    );
                setAddF({orders: false, products: false, settings: false, categories: false});
                setfSwitch({orders: false, products: false, settings: true, categories: false});

            
            }}>
            <img src="icons/light/cog.svg" height='30px' width='30px' alt="" />
            </button>
    );
}

export default SettingsMain;
