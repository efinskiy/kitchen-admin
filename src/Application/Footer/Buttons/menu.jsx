import css from './Buttons.module.css';
import classNames from 'classnames';

export function Menu(props) {
    const {state, isActive, tabs, addf} = props
    const [tabsState, setTabsState] = tabs
    const [additionalFooter, setAdditionalFooter] = addf
    return (
        <button className={classNames(css.button, {[css.active]: isActive})} onClick={() => {additionalFooter.orders === true ? setAdditionalFooter({orders: false, products: false, settings: false, categories: false}) : setAdditionalFooter({orders: true, products: false, settings: false, categories: false})}}>
        <img src="icons/light/store.svg" height='30px' width='30px' alt="" />
        </button>
    );
}