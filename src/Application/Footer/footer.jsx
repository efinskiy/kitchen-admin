import { Menu } from "./Buttons/menu";
import { Products } from "./Buttons/products";
import { Category } from "./Buttons/categories"
import { Settings } from "./Buttons/settings"

import css from './footer.module.css';
import { useState } from "react";


export function Footer(props) {
    const {switchprops} = props
    const [fswitch, setfSwitch] = switchprops

    return (
        <footer className={css.footer}>
            <ul className={css.ul}>
                <li className={css.smallButtonli}>
                    <Menu useState={setfSwitch} isActive={fswitch.orders}/>
                </li>
                <li className={css.smallButtonli}>
                    <Products useState={setfSwitch} isActive={fswitch.products}/>
                </li>
                <li className={css.smallButtonli}>
                    <Category useState={setfSwitch} isActive={fswitch.categories}/>
                </li>
                <li className={css.smallButtonli}>
                    <Settings useState={setfSwitch} isActive={fswitch.settings}/>
                </li>

            </ul>
        </footer>
    );
}