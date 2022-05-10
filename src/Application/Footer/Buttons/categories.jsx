import css from './Buttons.module.css';
import classNames from 'classnames';

export function Category(props) {
    return (
        <button className={
            classNames(css.button, 
                    {[css.active]: props.isActive})}
                    onClick={
                        () => props.useState(
                            {orders: false, products: false, settings: false, categories: true}
                        )}>
        <img src="icons/light/folders.svg" height='30px' width='30px' alt="" />
        </button>
    );
}