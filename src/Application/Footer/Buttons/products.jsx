import css from './Buttons.module.css';
import classNames from 'classnames';

export function Products(props) {
    const {state, tabs, addf} = props
    const [tabsState, setTabsState] = tabs
    const [additionalFooter, setAdditionalFooter] = addf
    return (
        <button className={
            classNames(css.button, 
                    {[css.active]: props.isActive})}
                    onClick={
                        () => {additionalFooter.products === true ? setAdditionalFooter({orders: false, products: false, settings: false, categories: false}) : setAdditionalFooter({orders: false, products: true, settings: false, categories: false})}}>
            <img src="icons/light/burger-soda.svg" height='30px' width='30px' alt="" />
        </button>
    );
}