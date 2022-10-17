import React, { lazy } from 'react'


async function NetworkFindPrefixCodeName(props , prefixNameCode){
   // console.log("GET All items!");
    //propsShow.alertNetworkShowMessageInfo("Получаем данные с сервера" , true);
    await componentDidMount(props ,prefixNameCode);
}

async function componentDidMount(props ,prefixNameCode) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch("http://localhost:8081/code-rest/findCode?prefixcode="+prefixNameCode, requestOptions)
    .then(data => { 
       // console.log("Данные NetworkFindPrefixCodeName: ")
       // console.log(data)
        if (!data.ok) {
            throw new Error(data.statusText)
        }
        return data.json() 
    })
    
    .then(datum => {
        //console.log("NetworkFindPrefixCodeName Request to server ")
        //console.log(datum)
       props.callbackResult(datum);
    }).catch(err=>{
        //console.log("ERROR not connection to server")
       // propsAlert.alertNetworkShowMessageReuqest(false , err);
    });
        
}



export default NetworkFindPrefixCodeName; 