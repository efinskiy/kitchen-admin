import css from './Buttons.module.css';
import classNames from 'classnames';

export function Settings(props) {
    const {state, tabs, addf} = props
    const [tabsState, setTabsState] = tabs
    const [additionalFooter, setAdditionalFooter] = addf
    return (
        <button 
            className={classNames(css.button, {[css.active]: props.isActive})} 
            onClick={ () => {additionalFooter.settings === true ? setAdditionalFooter({orders: false, products: false, settings: false, categories: false}) :  setAdditionalFooter({orders: false, products: false, settings: true, categories: false})}}
            >
        <img src="icons/light/tools.svg" height='30px' width='30px' alt="" />
        </button>
    );
}