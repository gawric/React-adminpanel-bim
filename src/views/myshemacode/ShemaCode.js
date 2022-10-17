import React, { lazy , useState , useRef } from 'react'
import NetworkGetAllItemsCode from "./network/NetworkGetAllItemsCode"
import NetworkAddPostItemsCode from "./network/NetworkAddPostItemsCode"
import NetworkDeleteCode from "./network/NetworkDeleteCode"
import RemoveItemArr from "./support/RemoveItemArr"
import AdditemArr from "./support/AddItemToArray"
import NetworkGetPageCode from "./network/NetworkGetPageCode"
import ListAddTableName from "./support/ListAddTableName"
import ListAddTableCode from "./support/ListAddTableCode"

import {
  CCard,
  CCardBody,
  CHeaderBrand, 
  CCol,
  CFormLabel,
  CFormInput,
  CButton,
  CListGroup,
  CListGroupItem,
  CRow,
  CPaginationItem,
  CPagination,
  CAlert,
  CCardHeader,
} from '@coreui/react'


const ShemaCode = () => {

  const [valueAlertColor, setAlertColor] = useState("danger");
  const [valueAlertText, setAlertText] = useState("");
  const [valuesListNameItems, setValueListItemsName] = useState([]);
  const [valuesListNameWorker, setValueListItemsWorker] = useState([]);
  //1 - textbox
  const [valueNameItem, setValueNameItem] = useState("");
  const [valueCodeItem, setValueCodeItem] = useState("");

  //2 - textbox
  const [valueNameWorker, setValueNameWorker] = useState("");
  const [valueCodeWorker, setValueCodeWorker] = useState("");

  const [valueSelectRow, setValueSelectRow] = useState(0);

  const [showAlert, toggleShowAlert] = useState(false);
  const refInit = useRef(true);


   //console.log(refInit.current)
   if(refInit.current){
    console.log("Сработал Ref")
    refInit.current = false;
    alertNetworkShowMessageInfo("Загрузка данных" , true)
    NetworkGetAllItemsCode({initDataTable} , {showAlertMessage})
  }

  function showAlertMessage(isAlert , text){
    //console.log(text)
    if(isAlert){
        toggleShowAlert(true)
        setAlertText(text)
        setAlertColor("danger")
    }
    else{
        toggleShowAlert(true)
        setAlertText(text)
        setAlertColor("success")
    }
  }

  function alertNetworkShowMessageInfo(text , isshow){
    setAlertText(text);
    setAlertColor("info");
    toggleShowAlert(isshow);
  }
    
function initDataTable(datum){
  alertNetworkShowMessageInfo("Загрузка данных" , false)
  addItemName(datum);
}

function callbackAddItems(data){
  var datum = [data];
  addItemName(datum)
}

function clallbackGetPage(data){
  console.log("clallbackGetPage--->")
  console.log(data);
  addItemName(data);
}

function addItemName(datum){
  const arrclone2 = Array.from(valuesListNameItems)
  const arrclone1 = Array.from(valuesListNameWorker)
  AdditemArr(datum , arrclone2 , arrclone1);
  setValueListItemsName(arrclone2);
  setValueListItemsWorker(arrclone1);
}

function handleSelectRows(e){
  console.log("Select event rows >>>>")
  console.log(e.target.id)
  setValueSelectRow(e.target.id);
}

function handleWorkerInputName(e){
  //console.log("пришел запрос на изменение handleWorkerInputName")
  setValueNameWorker(e.target.value); 
}

function handleWorkerInputCode(e){
  //console.log("пришел запрос на изменение handleWorkerInputCode")
  setValueCodeWorker(e.target.value); 
}

function clallBackClearCode(index){
  if(index == 1){
    if(valuesListNameWorker.length >0){
      setValueListItemsWorker(valuesListNameWorker.length = 0)
    }
    
  }else{
    if(valuesListNameItems.length >0){
      setValueListItemsName(valuesListNameItems.length = 0)
    }
    
  }
}

function clallBackSelectCodeNumber(codenumber){
  console.log("clallBackSelectCodeNumber => " + codenumber);
}

function callbackRemove(code_id){
  alertNetworkShowMessageInfo("Загрузка данных" , false)
  showAlertMessage(false , " Выполненно! ")
  console.log("callbackremove-> " + code_id)
  const arr1 = Array.from(RemoveItemArr(valuesListNameWorker, code_id))
  const arr2 = Array.from(RemoveItemArr(valuesListNameItems, code_id))
  setValueListItemsWorker(arr1)
  setValueListItemsName(arr2)
}

function handleClassificInputName(e){
  //console.log("пришел запрос на изменение handleClassificInputItem")
  setValueNameItem(e.target.value); 
}

function handleClassificInputCode(e){
  //console.log("пришел запрос на изменение handleClassificInputCode")
  setValueCodeItem(e.target.value); 
}

  return (
    <>
    <CCard className="mb-4">
      <CCardHeader> <CHeaderBrand href="#">Классификатор элементов</CHeaderBrand></CCardHeader>
       <CCardBody>
       <CRow>
          {showAlert &&  <CAlert color={valueAlertColor} visible="true">{valueAlertText}</CAlert>}
        </CRow>
        <CRow>
          <CCol xs={6}>
           <div className="mb-3">
             <CFormLabel htmlFor="inputtextname">Добавить название</CFormLabel>
             <CFormInput type="text" id="inputtextname"  value={valueNameItem}  onChange={handleClassificInputName} aria-describedby="passwordHelpBlock" placeholder="Монолитная стена" />
           </div>
          </CCol>
          <CCol xs={6}>
          <div className="mb-3">
            <CFormLabel htmlFor="inputtextindex">Прикрепить индекс</CFormLabel>
            <CFormInput type="text" id="inputtextindex" value={valueCodeItem}  onChange={handleClassificInputCode}  aria-describedby="passwordHelpBlock" placeholder="0007b" />
          </div>
          </CCol>
        </CRow>
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
       </CCardBody>
       <div className="margin-5">
        <CRow>
          <CPagination align="end"  size="sm" aria-label="Page navigation example">
            <CPaginationItem disabled>Previous</CPaginationItem>
            <CPaginationItem onClick={(e) => {NetworkGetPageCode({clallBackClearCode} , {clallbackGetPage} , {showAlertMessage} , 0 , 2)}}>1</CPaginationItem>
            <CPaginationItem onClick={(e) => {NetworkGetPageCode({clallBackClearCode} , {clallbackGetPage} , {showAlertMessage} , 1 , 2)}}>2</CPaginationItem>
            <CPaginationItem onClick={(e) => {NetworkGetPageCode({clallBackClearCode} , {clallbackGetPage} , {showAlertMessage} , 2 , 2)}}>3</CPaginationItem>
            <CPaginationItem >Next</CPaginationItem>
          </CPagination>
        </CRow>
        </div>
       <CCardBody>
       <CRow className="mb-3">
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <CButton  onClick={(e) => {NetworkAddPostItemsCode(2, valueNameItem, valueCodeItem , {showAlertMessage} , {callbackAddItems})}} color="success" shape="rounded-0">Добавить новый</CButton>
              <CButton  onClick={(e) => {NetworkDeleteCode({callbackRemove} , {showAlertMessage}, valueSelectRow , {alertNetworkShowMessageInfo})}}  color="danger" shape="rounded-0">Удалить</CButton>
          </div>
        </CRow>
        </CCardBody>
    </CCard>

    <CCard className="mb-4">
    <CCardHeader> <CHeaderBrand href="#">Классификатор работ</CHeaderBrand></CCardHeader>
       <CCardBody>
        <CRow>
          <CCol xs={6}>
           <div className="mb-3">
             <CFormLabel htmlFor="inputtextname">Добавить название</CFormLabel>
             <CFormInput type="text" id="inputtextname"  value={valueNameWorker}  onChange={handleWorkerInputName}  aria-describedby="passwordHelpBlock" placeholder="Монолитная стена" />
           </div>
          </CCol>
          <CCol xs={6}>
          <div className="mb-3">
            <CFormLabel htmlFor="inputtextindex">Прикрепить индекс</CFormLabel>
            <CFormInput type="text" id="inputtextindex" value={valueCodeWorker}  onChange={handleWorkerInputCode}   aria-describedby="passwordHelpBlock" placeholder="0007b" />
          </div>
          </CCol>
        </CRow>
        <CRow>
        <CCol >
        <CListGroup>
            {ListAddTableName(valuesListNameWorker , {handleSelectRows})}
        </CListGroup>
        </CCol>
        <CCol >
        <CListGroup>
            {ListAddTableCode(valuesListNameWorker , {handleSelectRows})}
        </CListGroup>
        </CCol>
        </CRow>
        </CCardBody>
       <CCardBody>
       <div className="margin-5">
        <CRow>
          <CPagination align="end"  size="sm" aria-label="Page navigation example">
            <CPaginationItem disabled>Previous</CPaginationItem>
            <CPaginationItem onClick={(e) => {NetworkGetPageCode({clallBackClearCode} , {clallbackGetPage} , {showAlertMessage} , 0 , 1)}}>1</CPaginationItem>
            <CPaginationItem onClick={(e) => {NetworkGetPageCode({clallBackClearCode} , {clallbackGetPage} , {showAlertMessage} , 1 , 1)}}>2</CPaginationItem>
            <CPaginationItem onClick={(e) => {NetworkGetPageCode({clallBackClearCode} , {clallbackGetPage} , {showAlertMessage} , 2 , 1)}}>3</CPaginationItem>
            <CPaginationItem>Next</CPaginationItem>
          </CPagination>
        </CRow>
        </div>
       <CRow>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
               <CButton  onClick={(e) => {NetworkAddPostItemsCode(1 , valueNameWorker, valueCodeWorker , {showAlertMessage} , {callbackAddItems})}} color="success" shape="rounded-0">Добавить новый</CButton>
               <CButton  onClick={(e) => {NetworkDeleteCode({callbackRemove} , {showAlertMessage}, valueSelectRow , {alertNetworkShowMessageInfo})}}  color="danger" shape="rounded-0">Удалить</CButton>
          </div>
        </CRow>
        </CCardBody>
    </CCard>
    </>
  )
}




export default ShemaCode