import css from './Buttons.module.css';
import classNames from 'classnames';

export function Settings(props) {
    return (
        <button className={
            classNames(css.button, 
                    {[css.active]: props.isActive})}
                    onClick={
                        () => props.useState(
                            {orders: false, products: false, settings: true, categories: false}
                        )}>
        <img src="icons/light/tools.svg" height='30px' width='30px' alt="" />
        </button>
    );
}