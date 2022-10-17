import React, {useEffect , useState } from "react";

import {
    CCol,
    CForm,
    CFormLabel,
    CFormInput,
    CButton,
    CRow,
  } from '@coreui/react'

  

 

function EventSelectRule(props) {

 
  const [valuesText, setValuesText] = useState("");


    React.useEffect(() => {
      if (props.updateName) {
       // console.log("RUNNING EventSelectRule")
       // console.log(props)
        setValuesText(props.replaceName)
      }
      if(props.visible == false){
        setValuesText("")
      }
    })

  

  function handleChangeInput(e){
    setValuesText(e.target.value); 
  }



  //console.log("Нажали кнопку сохр на уровне 7")
  //console.log(valuesText)
  //console.log(props)
  //console.log(props.replaceName)

  function clickButton(button){
    button.preventDefault();
    props.callback.callBackDataRules(valuesText);
  }

        if(props.visible == true)
        {
            return (
                <CRow>
                <CForm className="row g-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1"><b>Заменить на</b></CFormLabel>
                 <CCol xs="auto">
                  <CFormLabel htmlFor="inputtextreplace" className="visually-hidden">Заменить на</CFormLabel>
                  <CFormInput type="text" id="inputtextreplace"  value={valuesText}  onChange={handleChangeInput}  placeholder="Марка бетона B25"/>
                 </CCol>
                 <CCol xs="auto">
                  <CButton type="submit" onClick={(e) => {clickButton(e)}} className="mb-3">Сохранить</CButton>
                 </CCol>
               </CForm>
              </CRow>
          )
        }
        else
        {
          
            return (
                <CRow>
                </CRow>
          )
        }
       
      
}




export default EventSelectRule; 