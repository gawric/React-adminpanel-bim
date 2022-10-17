import React, { lazy } from 'react'


async function NetworkGetPageCode(propsclall , props , propsAlert , numpage , typecode){
    propsclall.clallBackClearCode(typecode)
    await componentDidMount(props , propsAlert , numpage , typecode);
}

async function componentDidMount(props ,propsAlert, numpage , typecode) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch("http://localhost:8081/code-rest/getPage?page="+numpage+"&typecode="+typecode, requestOptions)
    .then(data => { 
        console.log("NetworkGetPageCode responce ");
        console.log(data)
        if (!data.ok) {
            if(data.status != 404){
                console.log("NetworkGetPageCode responce выкидываем ошибку!");
                throw new Error(data.statusText)
            }
            else{
                 console.log("Данные NetworkGetPageCode: > возвращаю пустоту!")
                 return "";
             }
        }
        return data.json() 
    })
    
    .then(datum => {
       props.clallbackGetPage(datum);
    }).catch(err=>{
        console.log(err)
        propsAlert.showAlertMessage(true , err.toString());
    });
        
}



export default NetworkGetPageCode; 