import React, { lazy } from 'react'


async function NetworkGetAllClassific(props , parentId , propsAlert , propsShow , themeId){
    //console.log("NetworkGetAllClassific " + parentId);
    propsShow.alertNetworkShowMessageInfo("Получаем данные с сервера" , true);
    await componentDidMount(props ,  parentId , propsAlert , themeId);
}

async function componentDidMount(props , parentId ,propsAlert , themeId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    await fetch("http://localhost:8081/classific-rest/getAllParentClassific?parent_id="+parentId+"&theme_id="+themeId, requestOptions)
    .then(data => { 
        console.log("NetworkGetAllClassific responce ");
        console.log(data)
        if (!data.ok) {
            if(data.status != 404){
                console.log("NetworkGetAllClassific responce выкидываем ошибку!");
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
       props.initDataTree(datum);
    }).catch(err=>{
        console.log(console.error())
        propsAlert.alertNetworkShowMessageReuqest(false , err);
    });
        
}



export default NetworkGetAllClassific; 