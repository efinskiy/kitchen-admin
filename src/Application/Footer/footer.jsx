import { Menu } from "./Buttons/menu";
import { Products } from "./Buttons/products";
import { Settings } from "./Buttons/settings"
import OrdersCurrent from "./Buttons/submenu/ordersCurrent";
import OrdersPast from "./Buttons/submenu/ordersPast";
import ProductsWarehouse from "./Buttons/submenu/productsWarehouse";
import ProductsAdd from "./Buttons/submenu/productsAdd";
import ProductsCategories from "./Buttons/submenu/productsCategories";
import SettingsMain from "./Buttons/submenu/settingsMain";
import SettingsSecure from "./Buttons/submenu/settingsSecure";
import SettingsUsers from "./Buttons/submenu/settingsUsers";
import SettingsLogout from "./Buttons/submenu/settingsLogout";
import css from './footer.module.css';
import { useState } from "react";

import classNames from 'classnames';


export function Footer(props) {
    const {switchprops, tabsprops, addprops, userstate} = props
    const [user, setUser] = userstate;
    const [fswitch, setfSwitch] = switchprops
    const [tabsState, setTabsState] = tabsprops
    const [additionalFooter, setAdditionalFooter] = addprops

    return (
        <footer className={css.footer}>
            <ul className={css.ul}>
                <li className={css.smallButtonli}>
                    <div className={classNames({[css.active]: additionalFooter.orders === true ? true : false}, css.menuSubmenu)} >
                        <OrdersCurrent switchprops={switchprops} isActive={tabsState.ordersCurrent} setTabsState={setTabsState} setAddF = {setAdditionalFooter}/>
                        <OrdersPast switchprops={switchprops} isActive={tabsState.ordersPast} setTabsState={setTabsState} setAddF = {setAdditionalFooter}/>
                     </div>
                    <Menu state={setfSwitch} isActive={fswitch.orders} tabs = {[tabsState, setTabsState]} addf={[additionalFooter, setAdditionalFooter]}/>
                </li>
                <li className={css.smallButtonli}>
                     <div className={classNames({[css.active]: additionalFooter.products === true ? true : false}, css.menuSubmenu)} >
                        <ProductsWarehouse switchprops={switchprops} isActive={tabsState.productsWarehouse} setTabsState={setTabsState} setAddF = {setAdditionalFooter}/>
                        {/* <ProductsAdd switchprops={switchprops} isActive={tabsState.productsAdd} setTabsState={setTabsState} setAddF = {setAdditionalFooter}/> */}
                        <ProductsCategories switchprops={switchprops} isActive={tabsState.productsCategories} setTabsState={setTabsState} setAddF = {setAdditionalFooter}/>
                     </div>
                    <Products state={setfSwitch} isActive={fswitch.products} tabs = {[tabsState, setTabsState]} addf={[additionalFooter, setAdditionalFooter]}/>
                </li>
                <li className={css.smallButtonli}>
                    <div className={classNames({[css.active]: additionalFooter.settings === true ? true : false}, css.menuSubmenu)} >
                        <SettingsMain switchprops={switchprops} isActive={tabsState.settingsMain} setTabsState={setTabsState} setAddF = {setAdditionalFooter}/>
                        {/* { user.is_admin === true ? <SettingsSecure switchprops={switchprops} isActive={tabsState.settingsPayments} setTabsState={setTabsState} setAddF = {setAdditionalFooter}/> : false } */}
                        <SettingsUsers switchprops={switchprops} isActive={tabsState.settingsUsers} setTabsState={setTabsState} setAddF = {setAdditionalFooter}/>
                        <SettingsLogout userstate={[user, setUser]}/>
                     </div>
                    <Settings state={setfSwitch} isActive={fswitch.settings} tabs = {[tabsState, setTabsState]} addf={[additionalFooter, setAdditionalFooter]}/>
                </li>

            </ul>
        </footer>
    );
}