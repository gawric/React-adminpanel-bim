import React, { useState , useEffect } from "react";
import NetworkGetAllItemsCode from "./network/NetworkFindPrefixCodeName"
import ListAddTableCode from "src/views/myshemacode/support/ListAddTableCode"
import ListAddTableName from "src/views/myshemacode/support/ListAddTableName"
import AddItemArray from "src/views/myshemacode/support/AddItemToArray"
import SearchRowToArray from "src/views/myshemacode/support/SearchRowToArray"

import {
    CInputGroup,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CCol,
    CFormInput,
    CButton,
    CListGroup,
    CRow,

  } from '@coreui/react'




function ShemaclCodeUI(props , inCode) {
  const [visible, setVisible] = useState(false)
  const [valueSearchInput, setValueSearchInput] = useState("");
  const [valueCodeInput, setValueCodeInput] = useState("");
  const [valuesListNameItems, setValueListNameItems] = useState([]);
  //console.log("ShemaclCodeUI >>> " + inCode);
  

  useEffect(() => {
    setValueCodeInput(inCode)
  });

  function handleInputName(e){

    var codename = e.target.value;
    
    if(!isEmpty(e.target.value)){
      //console.log("Отправляем поиск " + e.target.value)
      NetworkGetAllItemsCode({callbackResult} , codename);
    }
   
    setValueSearchInput(codename); 
  }

  function handleInputCode(e){
    setValueCodeInput(e.target.value)
  }

  function addItemName(datum){
    const arrclone2 = Array.from(valuesListNameItems)
    AddItemArray(datum , arrclone2 , []);
    setValueListNameItems(arrclone2);
  }

  function callbackResult(datum){
    //console.log("get data ShemaClCodeUi")

    //console.log(datum)
    if(valuesListNameItems.length >0){
      setValueListNameItems(valuesListNameItems.length = 0)
    }
    addItemName(datum)
  }


  function handleSelectRows(e){
    var code_id = e.target.id;
    saveEvent(code_id);
  }
  function isEmpty(value){
    
    if(value.trim() != ""){
      return false;
    }
    return true;
  }

  function saveEvent(code_id){
    var element = SearchRowToArray(code_id , valuesListNameItems)
    console.log("Select Rows CodeUi>")
    console.log(element);
    setVisible(false)
    props.callBackSelectCodeNumber(element.keycode , code_id);
    setValueCodeInput(element.keycode);
  }

    return (
        <>
        <div>
        <CInputGroup className="mb-3">
          <CFormInput  value={valueCodeInput}  onChange={handleInputCode} placeholder="Добавить код классификатора" aria-label="code" aria-describedby="basic-addon1"/>
          <CButton onClick={() => setVisible(!visible)} color="info">Поиск</CButton>
        </CInputGroup>
        </div> 

          <CModal size="lg" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
             <CModalTitle>Поиск по имени классификатора</CModalTitle>
            </CModalHeader>
          <CModalBody> 
             <CInputGroup className="mb-3">
              <CFormInput value={valueSearchInput}  onChange={handleInputName} placeholder="Имя классификатора" aria-label="code"/>
              </CInputGroup>
              <CRow>
                <CCol >
                  {ListAddTableName(valuesListNameItems , {handleSelectRows})}
                </CCol>
                <CCol >
                <CListGroup>
                  {ListAddTableCode(valuesListNameItems , {handleSelectRows})}
                </CListGroup>
                </CCol>
              </CRow>
          </CModalBody>
          <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Закрать
                </CButton>
            </CModalFooter>
          </CModal>
        </>
      )
    
  }


export default ShemaclCodeUI; 