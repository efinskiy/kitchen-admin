import React from 'react';
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../Services/auth';

const Application = () => {
    const [user, setUser] = useState();
    const [orders, setOrders] = useState();

    return (
        <div>

            {
                user !== undefined && orders !== undefined ?
                    <p>Application loaded</p>
                :
                    <p>Application loading...</p>
            }

        </div>
    );
}

export default Application;
