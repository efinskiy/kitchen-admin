import React from 'react';
import { useState, useEffect } from 'react';
import { changeSettings, getSettings } from '../../../../Services/settings';
import Loader from '../../../Loader/loader';

const Settings = (props) => {
    const [settings, setSettings] = useState();
    const [kitchenStatus, setKitchenStatus] = useState(false);

    useEffect(() => {
        getSettings().then(json => {
            setSettings(json.settings)
        });
    }, []);

    useEffect(()=>{
        assignStatus();
    }, [settings]);

    const assignStatus = () => {
        // settings.kitchenStatus !== undefined ? setKitchenStatus(settings.kitchenStatus.value) : false
        if (settings !== undefined){
            setKitchenStatus(
                settings.kitchenStatus.value === "available" ? true : false
                )
        } 
    } 

    const isLoaded = () =>{
        if (settings !== undefined){
            return true;
        }else{
            return false;
        }
    }

    const handleCheckboxKitchenStatus = () => {
        changeSettings(settings.kitchenStatus.key, kitchenStatus === true ? 'not_available' : 'available').then(
            json => {
                json.code === 200 ? setKitchenStatus(kitchenStatus === true ? false : true) : alert('Что то пошло не так при выполнении запроса.')
            }
        )
    }

    return (
        isLoaded() === true ?
        <div className='settings'>
            <h3>Настройки</h3>
            <div className="">
            <span>Включить столовую</span>
            <input type="checkbox" checked={kitchenStatus} onChange={handleCheckboxKitchenStatus}/>
            </div>
        </div>
        : <Loader/>
    );
}

export default Settings;
