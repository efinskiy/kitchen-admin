import css from './Buttons.module.css';
import classNames from 'classnames';

export function Menu(props) {
    
    return (
        <button className={
            classNames(css.button, 
                    {[css.active]: props.isActive})}
                    onClick={
                        () => props.useState(
                            {orders: true, products: false, settings: false, categories: false}
                        )}>
        <img src="icons/light/store.svg" height='30px' width='30px' alt="" />
        </button>
    );
}