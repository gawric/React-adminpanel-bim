import React, { lazy } from 'react'

function onSelectRow(event , props){
    var idEvent = event.target.value;
    console.log("Выбрали из списка номер " + event.target.value);
    console.log(props);
    props.selectRules(idEvent)
}



export default onSelectRow; 