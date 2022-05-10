import css from './Buttons.module.css';
import classNames from 'classnames';

export function Products(props) {
    
    return (
        <button className={
            classNames(css.button, 
                    {[css.active]: props.isActive})}
                    onClick={
                        () => props.useState(
                            {orders: false, products: true, settings: false, categories: false}
                        )}>
        <img src="icons/light/burger-soda.svg" height='30px' width='30px' alt="" />
        </button>
    );
}