import React, { lazy } from 'react'


async function NetworkGetInitData(props , propsAlert){

    await componentDidMount(props , propsAlert);
}

async function componentDidMount(props ,propsAlert) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch("http://localhost:8081/dashboard-rest/getInitData", requestOptions)
    .then(data => { 
        console.log("NetworkGetInitData responce ");
        console.log(data)
        if (!data.ok) {
            if(data.status != 404){
                console.log("NetworkGetInitData responce выкидываем ошибку!");
                throw new Error(data.statusText)
            }
            else{
                 console.log("Данные NetworkGetInitData: > возвращаю пустоту!")
                 return "";
             }
        }
        return data.json() 
    })
    
    .then(datum => {
        //console.log("NetworkGetInitData Result>>>>>")
        //console.log(datum)
        props.initData(datum);
    }).catch(err=>{
        console.log(err)
        propsAlert.showAlertMessage(true , err.toString());
    });
        
}



export default NetworkGetInitData; 