import React, { lazy } from 'react'


async function NetworkGetAllThemeClassificShema(propsCallback , propsAlert ,propsShow){
    console.log("NetworkGetAllThemeClassificShema ");
    propsShow.alertNetworkShowMessageInfo("Получаем данные с сервера" , true);
    await componentDidMount(propsCallback , propsAlert);
}

async function componentDidMount(propsCallback, propsAlert) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch("http://localhost:8081/classifictheme-rest/getAllTheme", requestOptions)
    .then(data => { 
        console.log("NetworkGetAllThemeClassificShema responce ");
        console.log(data)
        if (!data.ok) {
            if(data.status != 404){
                console.log("NetworkGetAllThemeClassificShema responce выкидываем ошибку!");
                throw new Error(data.statusText)
            }
            else{
                 console.log("Данные NetworkGetAllThemeClassificShema: > возвращаю пустоту!")
                 return "";
             }
        }
        return data.json() 
    })
    
    .then(datum => {
       //props.initDataTree(datum);
       console.log("NetworkGetAllThemeClassificShema-> Получили результат")
       console.log(datum)
       propsCallback.callBackInitTheme(datum);
    }).catch(err=>{
        console.log(err)
        propsAlert.alertNetworkShowMessageReuqest(false , err);

    });
        
}



export default NetworkGetAllThemeClassificShema; 