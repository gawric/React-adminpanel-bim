import React, { useState , useEffect } from "react";
import NetworkPostSelectResult from './network/NetworkPostSelectResult'


import {
    CCol,
    CFormSelect,
    CRow
  } from '@coreui/react'


  function selectEvent(e ,  props  , propsSelectData, propsAlert){
    var selectRule = e.target.value;
    if(!!selectRule){

      //console.log("SelectClassific>>>timestamp");
      //console.log(selectRule);
      
      if(isValid(selectRule , propsSelectData.selectTheme , propsSelectData.selectDataScaner)){
        propsAlert.showAlertMessage(false , "Скрыть");
        NetworkPostSelectResult(selectRule , propsSelectData.selectTheme , propsSelectData.selectDataScaner , props , propsAlert)
      }
      else{
        console.log("SelectClassific>>> не верные данные! обнаружили пустоту в selectRule или selectTheme или selectTimeStamp")
        console.log(propsSelectData)
        propsAlert.showAlertMessage(true , "Не все данные были заполнены!");
      }

    }
  
   
  }

  function isValid(selectRule , selectTheme , selectTimeStamp){
    if(selectRule !== "Выберите правило для просмотра" & !!selectTheme & !!selectTimeStamp){
      return true;
    }

    return false;
  }


function SelectClassific(listClassific , props , propsSelectData ,propsAlert) {

    if(Array.isArray(listClassific))
    {
            //console.log("ARRRAY is TRUE")
            return <>
            <CRow>
                <CCol xs={6}>
                <CFormSelect  onChange={ e => selectEvent(e ,  props  , propsSelectData, propsAlert) } size="sm" className="mb-3" aria-label="Выберите правило для просмотра">
                 <option>Выберите правило для просмотра</option>
                  {
                   listClassific.map((items , sIndex) => {
                     return (
                        <option value={items.classific_id}    key={sIndex}>{items.nameclassific}</option>
                     );
                  })}
                </CFormSelect>
            </CCol>
        </CRow>
        </>
    }
    else
    {
        //console.log("ARRRAY is NO TRUE")
        return <>
            <CRow>
          <CCol xs={6}>
            <CFormSelect size="sm" className="mb-3" aria-label="Выберите правило для просмотра">
              <option>Выберите правило для просмотра</option>
              <option>Нет данных</option>
            </CFormSelect>
          </CCol>
        </CRow>
        </>
    }

  }


export default SelectClassific; 