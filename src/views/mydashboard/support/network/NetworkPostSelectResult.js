import React, { lazy } from 'react'


async function NetworkPostSelectResult(selectClassific , selectTheme , selectData , props , propsAlert){
    console.log("Init NetworkPostSelectResult>>>> ")
    console.log(selectClassific)

    await componentDidMount(selectClassific , selectTheme , selectData , props , propsAlert);
}



async function componentDidMount(selectClassific , selectTheme , selectData , props ,propsAlert) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({classific_id: selectClassific , 
            theme_id: selectTheme ,
            datetime: selectData})};

    await fetch("http://localhost:8081/dashboard-rest/getCountRules", requestOptions)
    .then(data => { 
       // console.log("NetworkPostSelectResult responce ");
        //console.log(data)
        if (!data.ok) {
            if(data.status != 404){
               // console.log("NetworkPostSelectResult responce выкидываем ошибку!");
                throw new Error(data.statusText)
            }
            else{
               //  console.log("Данные NetworkPostSelectResult: > возвращаю пустоту!")
                 return "";
             }
        }
        return data.json() 
    })
    
    .then(datum => {
        console.log("NetworkPostSelectResult Result>>>>>")
        console.log(datum)
        props.clallBackSelectRule(datum ,selectClassific);
    }).catch(err=>{
        console.log(err)
        propsAlert.showAlertMessage(true , err.toString());
    });
        
}



export default NetworkPostSelectResult; 