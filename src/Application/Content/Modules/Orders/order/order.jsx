import React from 'react';

const Order = (props) => {
    const {order} = props
    return (
        <div className='order'>
            <p>ID {order.id}</p>
            
            
        </div>
    );
}

export default Order;
