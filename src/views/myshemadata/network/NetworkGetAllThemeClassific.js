import React, { lazy } from 'react'


async function NetworkGetAllThemeClassific(propsCallback , propsAlert){
    console.log("NetworkGetAllThemeClassific ");

    await componentDidMount(propsCallback , propsAlert);
}

async function componentDidMount(propsCallback, propsAlert) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch("http://localhost:8081/classifictheme-rest/getAllTheme", requestOptions)
    .then(data => { 
        console.log("NetworkGetAllThemeClassific responce ");
        console.log(data)
        if (!data.ok) {
            if(data.status != 404){
                console.log("NetworkGetAllThemeClassific responce выкидываем ошибку!");
                throw new Error(data.statusText)
            }
            else{
                 console.log("Данные NetworkGetAllThemeClassific: > возвращаю пустоту!")
                 return "";
             }
        }
        return data.json() 
    })
    
    .then(datum => {
       //props.initDataTree(datum);
       //console.log("NetworkGetAllThemeClassific-> Получили результат")
       //console.log(datum)
       propsCallback.callbackInitTheme(datum);
    }).catch(err=>{
        console.log(err)
        propsAlert.showAlertMessage("Сетевая ошибка " + err  , true)
    });
        
}



export default NetworkGetAllThemeClassific; 