import React, { lazy } from 'react'


async function NetworkAddPostItemsCode(tc , nc , kc , propsAlert , props){

    if(isValidData(tc , nc , kc )){
        await componentDidMount(tc , nc , kc , propsAlert , props);
    }
    else{
        propsAlert.showAlertMessage(true , "Не все поля были заполнены");
    }
    
}

function isValidData(tc , nc , kc )
{
  if(tc === null || nc === null || kc === null)
  {
    return false;
  }

  return true;
}

async function componentDidMount(tc , nc , kc , propsAlert , props) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({typecode:tc, namecode:nc , keycode:kc})
    };
    await fetch("http://localhost:8081/code-rest/addCode", requestOptions)
    .then(data => { 
        console.log("networkAddItemsCode responce ");
        console.log(data)
        if (!data.ok) {
            if(data.status != 404){
                console.log("networkAddItemsCode responce выкидываем ошибку!");
                throw new Error(data.statusText)
            }
            else{
                 console.log("Данные networkAddItemsCode: > возвращаю пустоту!")
                 return "";
             }
        }
        return data.json() 
    })
    
    .then(datum => {
       props.callbackAddItems(datum);
    }).catch(err=>{
        console.log(err)
        propsAlert.showAlertMessage(true , err.toString());
    });
        
}



export default NetworkAddPostItemsCode; 