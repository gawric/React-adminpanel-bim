import React, { useState , useEffect } from "react";
import TableModalWindow from './TableModalWindow'
import NetworkPostFindPrefix from "./network/NetworkPostFindPrefix"


import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter, 
    CInputGroup,
    CFormInput,
    CRow,
    CCol,
    CListGroup
  } from '@coreui/react'


var listPrefixData =[];
var propsRefreshPrefix = {refreshPrefix: false , refreshZeroText: false , refreshClose: false}
//не особо нужная переменная!
var tempRefresh = 0;

function WindowModalAllItemClassific(propsSelectData , propsAlert) {
    //console.log("НОВАЯ ПЕРЕРИСОВКА > WindowModalAllItemClassific")
    const [visible, setVisible] = useState(false)
    const [valueSearchInput, setValueSearchInput] = useState("")
    const [valueRefresh, setValueRefresh] = useState(0)

    function handleInputName(e){
        var result = e.target.value;
        Network(result.length , result);
        setValueSearchInput(result);
    }

    function Network(lenghtText , text){
        if(lenghtText > 0){
            NetworkPostFindPrefix(propsSelectData , {callBackPrefix} , propsAlert, text);
        }
        else{
            propsRefreshPrefix.refreshZeroText = true;
        }
    }

    function callBackPrefix(arr){
       // console.log("WindowModalAllItemClassific>>callBackPrefix>>>>")
        //console.log(arr)
        listPrefixData = arr;
        propsRefreshPrefix.refreshPrefix = true;
        setValueRefresh(arr.length + tempRefresh++);
        console.log("WindowModalAllItemClassific>>callBackPrefix>>>>ОБНОВЛЕНИЕ МОДЕЛИ!")
       
    }

  useEffect(() => {
    //setValueCodeInput(inCode)
  });

  function closeVisible(){
    propsRefreshPrefix.refreshClose = true;
    setVisible(false)
  }

      return <>
        <CButton  onClick={() => setVisible(!visible)} size="sm" color="info">Просм.</CButton>

         <CModal size="xl" visible={visible} onClose={() => closeVisible()}>
             <CModalHeader onClose={() => closeVisible()}>
              <CModalTitle>Все записи попавшие под правило</CModalTitle>
             </CModalHeader>
             <CModalBody> 
              <CInputGroup className="mb-3">
               <CFormInput value={valueSearchInput}  onChange={handleInputName} placeholder="Имя записи" aria-label="code"/>
               </CInputGroup>
               <CRow className="mb-3">
               {TableModalWindow(propsRefreshPrefix , listPrefixData , propsSelectData , propsAlert , {visible} , valueSearchInput.length)}
              </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Закрать
                </CButton>
            </CModalFooter>
         </CModal>
      </>
  
  }


export default WindowModalAllItemClassific; 