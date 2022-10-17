import React, { useState } from "react";
import ReactDOM from "react-dom";



function EventBtnKeyWord(e , props , inputValue){
  e.preventDefault();
  props.updateData(inputValue)
}


export default EventBtnKeyWord; 