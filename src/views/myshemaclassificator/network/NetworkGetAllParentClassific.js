import React, { lazy } from 'react'


async function NetworkGetAllParentClassific(props , parent_id , propsAlert , propsShow , theme_id){
    propsShow.alertNetworkShowMessageInfo("NetworkGetAllParentClassific Получаем данные с сервера" , true);
    await componentDidMount(props ,parent_id , propsAlert , theme_id);
    propsShow.alertNetworkShowMessageInfo("NetworkGetAllParentClassific Получаем данные с сервера" , false);
}

async function componentDidMount(props ,parent_id , propsAlert , theme_id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch("http://localhost:8081/classific-rest/getAllParentClassific?parent_id="+parent_id+"&theme_id="+theme_id, requestOptions)
    .then(data => { 
        //console.log("Данные NetworkGetAllParentClassific: >")
        //console.log(data)
        if (!data.ok) {
            if(data.status != 404){
                throw new Error(data.statusText)
            }
            else{
                console.log("Данные NetworkGetAllParentClassific: > возвращаю пустоту!")
                return "";
            }
        }

        return data.json() 
    })
    
    .then(datum => {
       props.callbackGetAllParent(datum);
    }).catch(err=>{
        console.log("ERROR not connection to server")
        propsAlert.alertNetworkShowMessageReuqest(false , err);
    });
        
}



export default NetworkGetAllParentClassific; 