import React, { lazy } from 'react'


async function NetworkGetAllItemsCode(props , propsAlert){

    await componentDidMount(props , propsAlert);
}

async function componentDidMount(props ,propsAlert) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch("http://localhost:8081/code-rest/getAllCode", requestOptions)
    .then(data => { 
        console.log("NetworkGetAllItemsCode responce ");
        console.log(data)
        if (!data.ok) {
            if(data.status != 404){
                console.log("NetworkGetAllItemsCode responce выкидываем ошибку!");
                throw new Error(data.statusText)
            }
            else{
                 console.log("Данные NetworkGetAllItemsCode: > возвращаю пустоту!")
                 return "";
             }
        }
        return data.json() 
    })
    
    .then(datum => {
       props.initDataTable(datum);
    }).catch(err=>{
        console.log(err)
        propsAlert.showAlertMessage(true , err.toString());
    });
        
}



export default NetworkGetAllItemsCode; 