import React, { lazy  , useState , useRef} from 'react'
import { CContainer } from '@coreui/react'
import Tree from '@naisutech/react-tree'
import SelectDataScanner from './support/SelectDataScanner'
import SelectTheme from './support/SelectTheme'
import SelectClassific from './support/SelectClassific'
import TableAllItems from './support/TableAllItems'
import NetworkGetInitData from './network/NetworkGetInitData'
import WindowModalAllItemClassific from './support/WindowModalAllItemClassific'


import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardTitle,
  CCardText,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormText,
  CProgress,
  CRow,
  CWidgetStatsB,
  CBadge,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
  CFormSwitch,
  CInputGroup,
  CAlert
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cilChartPie,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'



var propsAllData = {listAllClassific: [] , listAllDataSorted: [] , listAllDataTs: []  , listAllTheme: [] , listTs:[] , boxCheckColumn:[] }
var propsSelectData = {selectDataScaner: "" , selectDataNoScan: "",  initDataNoScan: false ,  selectTheme: "" , selectClassific: ""}

function callBackSetNoSortPages(selectData){
  propsSelectData.selectDataNoScan = selectData;
  console.log("Dashboard->callBackSetNoSortPages->DATA ")
  console.log(propsSelectData)
  console.log(selectData)
}

function callBackSetCheckBox(selectData){
  console.log("callBackSetCheckBox")
 // console.log(selectData)
  propsAllData.boxCheckColumn = selectData;
}


const Dashboard = () => {

  const [showAlert, toggleShowAlert] = useState(false);
  const [valueAlertColor, setAlertColor] = useState("danger");
  const [valueAlertText, setAlertText] = useState("");
  const [valueTextAllElement, setValueTextAllElement] = useState(0);
  const [valueTextThemelemet, setValueTextThemelemet] = useState(0);
  const [valueTextRoleElemet, setValueTextRoleElement] = useState(0);

  const refInit = useRef(true);


   //console.log(refInit.current)
   if(refInit.current){
    console.log("Сработал Ref")
    refInit.current = false;
    alertNetworkShowMessageInfo("Загрузка данных" , true)
    NetworkGetInitData({initData} , {showAlertMessage})
  }

  function alertNetworkShowMessageInfo(text , isshow){
    setAlertText(text);
    setAlertColor("info");
    toggleShowAlert(isshow);
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
    if(text == "Скрыть"){
      toggleShowAlert(false);
    }
  }

  function initData(datum){
    alertNetworkShowMessageInfo("Загрузка данных" , false)
    console.log("MyDashboard- initData >>>> " )
    console.log(datum)
    propsAllData.listAllClassific = datum.listAllClassific;
    propsAllData.listAllDataSorted = datum.listAllDataSorted;
    propsAllData.listAllDataTs = datum.listAllDataTs;
    propsAllData.listAllTheme = datum.listAllTheme;
    propsAllData.listTs = datum.listTs;
    propsAllData.boxCheckColumn = datum.boxCheckColumn;
    setAlertText("")
  }

  
  function callbackSelectDataTime(arr , dataTime){
    var result = arr[0];
    setValueTextAllElement(result);
    propsSelectData.selectDataScaner = dataTime;
  //  console.log("callbackSelectDataTime it's working! " + arr)
  }

 
  function callbackSelectTheme(arr , selectTheme){
    var result = arr[0];
    setValueTextThemelemet(result);
    propsSelectData.selectTheme = selectTheme;
    //console.log("callbackSelectTheme it's working! " + arr)
  }

   //arr[0] - select Rules count
  //arr[1] - select Theme count
  function clallBackSelectRule(arr , selectRule){
    console.log("clallBackSelectRule it's working! " + arr)
    var result = arr[0];
    setValueTextRoleElement(result)
    propsSelectData.selectClassific = selectRule;
  }

  function callBackNoSortPages(result , selectData){
    console.log("Dashboard->callBackNoSortPages->Result ")
    propsAllData.listTs = result;
    //console.log(propsSelectData);
  }

  function callBackNetworkResultNoSortTable(arr){
    propsAllData.listTs = arr;
  }

  

  return (
    <>
      <CRow>
        {showAlert &&  <CAlert color={valueAlertColor} visible="true">{valueAlertText}</CAlert>}
      </CRow>
      <CCard className="mb-4">
      <div className="d-grid gap-1">
        <div className="p-2 bg-light border margin">Статистика</div>
      </div>
       <CCardBody>
       <CRow>
        <CCol xs={6}>
         <CWidgetStatsB
           className="mb-3"
           progress={{ color: 'info', value: 75 }}
           text="Парсим данные полученные от TensorFlow"
           title="Запуск"
           value="75%"
         />
       </CCol>
       <CCol xs={6}>
          <CWidgetStatsB
           className="mb-3"
           color="primary"
           inverse
           progress={{ value: 75 }}
           text="Сейчас мы сканируем новые данные"
           title="Текущее сканирование TensorFlow"
           value="89.9%"
         />
       </CCol>
      </CRow>
       </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CRow>
          <CCol>
            <div className="d-grid gap-1">
                <div className="p-2 bg-light border margin">Свойства сканирования</div>
            </div>
          </CCol>
         </CRow>
       <CCardBody>
         <CRow>
         <CCol xs={6}>
            <CFormSwitch  className="mb-3"  label="Автоматически сканировать после TensorFlow" id="formSwitchCheckDefault"/>
          </CCol>
         </CRow>
         {SelectDataScanner(propsAllData.listAllDataSorted , propsSelectData , {callbackSelectDataTime} , {showAlertMessage})}
         {SelectTheme(propsAllData.listAllTheme , propsSelectData , {callbackSelectTheme} , {showAlertMessage})}
         {SelectClassific(propsAllData.listAllClassific , {clallBackSelectRule} ,  propsSelectData , {showAlertMessage})}
        <CRow className="mb-3">
        <CCol xs={6}>
        <CFormLabel htmlFor="exampleFormControlInput2">Всего элементов в сканере</CFormLabel>
        <div>
          <CInputGroup size="sm" className="mb-3">
            <CFormInput size="sm" value={valueTextAllElement} aria-label="code" aria-describedby="basic-addon1" disabled/>
          </CInputGroup>
        </div> 
        <CFormLabel htmlFor="exampleFormControlInput2">Всего элементов в выбранной теме</CFormLabel>
        <div>
          <CInputGroup size="sm" className="mb-3">
            <CFormInput size="sm" value={valueTextThemelemet} aria-label="code" aria-describedby="basic-addon1" disabled/>
          </CInputGroup>
        </div> 
        <CFormLabel htmlFor="exampleFormControlInput2">Попало под действие правила</CFormLabel>
        <div>
          <CInputGroup size="sm" className="mb-3">
            <CFormInput size="sm" value={valueTextRoleElemet} aria-label="code" aria-describedby="basic-addon1" disabled/>
            {WindowModalAllItemClassific(propsSelectData , {showAlertMessage})}
          </CInputGroup>
        </div> 
        </CCol>
        </CRow>
        <CRow>
          <CCol xs={2}>
            <CButton color="secondary">Сканировать вручную</CButton>
          </CCol>
          <CCol xs={6}>
            <CButton color="secondary">Получить результат</CButton>
          </CCol>
        </CRow>
       </CCardBody>
      </CCard>
      {TableAllItems(propsAllData.boxCheckColumn , propsAllData.listAllDataTs , propsAllData.listTs , propsSelectData , {showAlertMessage} , {callBackNoSortPages} , {callBackSetNoSortPages} , {callBackSetCheckBox} , {callBackNetworkResultNoSortTable})}
    </>
  )
}

export default Dashboard
