import React, { lazy } from 'react'


async function NetworkGetClassifiId(props , classific_id , propsAlert , propsShow){
   // console.log("GET All items!");
    propsShow.alertNetworkShowMessageInfo("Получаем данные с сервера" , true);
    await componentDidMount(props ,classific_id , propsAlert);
}

async function componentDidMount(props ,classific_id , propsAlert) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch("http://localhost:8081/classific-rest/getSinglClassific?id="+classific_id, requestOptions)
    .then(data => { 
        console.log("Данные NetworkGetClassifiId: ")
        console.log(data)
        if (!data.ok) {
            throw new Error(data.statusText)
        }
        return data.json() 
    })
    
    .then(datum => {
       props.initDataForm(datum);
    }).catch(err=>{
        //console.log("ERROR not connection to server")
        propsAlert.alertNetworkShowMessageReuqest(false , err);
    });
        
}



export default NetworkGetClassifiId; 