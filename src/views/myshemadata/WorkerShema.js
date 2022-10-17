import React, { lazy , useState , useRef } from 'react'
import { CContainer } from '@coreui/react'
import Tree from '@naisutech/react-tree'
import NetworkGetAllThemeClassific from './network/NetworkGetAllThemeClassific'
import NetworkChangeNameThemeClassific from './network/NetworkChangeNameThemeClassific'
import NetworkPostAddNewTheme from './network/NetworkPostAddNewTheme'
import NetworkDeleteThemeClassific from "./network/NetworkDeleteThemeClassific"

import {
    CCard,
    CCardBody,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CCol,
    CDropdown,
    CBadge,
    CForm,
    CFormLabel,
    CFormInput,
    CFormTextarea,
    CFormSelect,
    CButton,
    CListGroup,
    CListGroupItem,
    CRow,
    CPaginationItem,
    CPagination,
    CAlert,
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



const Workershema = () => {

    const [valuesNameTheme, setValuesNameTheme] = useState("");
    const [valuesListItems, setValueListItems] = useState([]);
    const [showAlert, toggleShowAlert] = useState(false);
    const [valueAlertColor, setAlertColor] = useState("danger");
    const [valueAlertText, setAlertText] = useState("");
    const [valueSelectId, setSelectId] = useState(0);

    const refInit = useRef(true);

    function handleChangeInputName(e){
        setValuesNameTheme(e.target.value); 
    }

    function callbackInitTheme(modelThemeClassific){
        //console.log("callbackInitTheme")
        //console.log(modelThemeClassific)
       if(Object.keys(modelThemeClassific).length > 0){
            setValueListItems(modelThemeClassific)
       }
        
    }

    function callbackAddNewRequest(modelThemeClassific){
        console.log("callbackAddNewRequest")
        console.log(modelThemeClassific)
        valuesListItems.push(modelThemeClassific)

        const  clonevaluesDataTree= Array.from(valuesListItems)
        setValueListItems(clonevaluesDataTree)
        setValuesNameTheme("")


        showAlertMessage("Тема создана успешно!" , false)
    }


    function callbackChangeName(modelTheme){
        console.log("callbackChangeName")
        console.log("Обработка callback!!!")
        var themeName = modelTheme[0].name;
        var id = modelTheme[0].classifictheme_id;
        setValuesNameTheme(themeName)
        changeNameList(id , themeName)
        showAlertMessage("Имя изменили успешно!" , false)
    }

    function callbackDeleteName(idTheme){
        console.log("callbackDeleteName-> Delete name !!! " + idTheme)
        const arrclone = Array.from(removeNodeTree(valuesListItems , idTheme))
        setValueListItems(arrclone);
        console.log(arrclone)
    }

    function removeNodeTree(valuesDataTree , idTheme){

        var arrDel = [];
          valuesDataTree.map((item , index)=>{
            if(item.classifictheme_id == idTheme){
              arrDel.push(item.classifictheme_id)
            }
          })

        console.log(arrDel)
        return valuesDataTree.filter(item => !arrDel.includes(item.classifictheme_id));;
      }



    function changeNameList(id , newname){
        valuesListItems.map((items , sIndex) => {
            console.log("Перебираем ")
            console.log(id)
            if(items.classifictheme_id == id){
                items.name = newname;
                console.log("Нашли и изменили имя в списке")
            }
     })

      const  clonevaluesDataTree= Array.from(valuesListItems)
      setValueListItems(clonevaluesDataTree)

    }

    function onClickTextBox(e){
        console.log("OnClickTextBox : ")
        setValuesNameTheme(e.target.childNodes[0].textContent); 
        setSelectId(e.target.id)
        //console.log(e)
        //console.log(e.target.childNodes[0].textContent)
    }

    function showAlertMessage(text , isAlert){
        if(isAlert){
            toggleShowAlert(true)
            setAlertText(text)
        }
        else{
            toggleShowAlert(true)
            setAlertText(text)
            setAlertColor("success")
        }
    }

    //console.log(refInit.current)
    if(refInit.current){
        console.log("Сработал Ref")
        refInit.current = false;
        NetworkGetAllThemeClassific({callbackInitTheme} , {showAlertMessage})
    }
    
  return (
    <>
    <CCard className="mb-4">
       <CCardBody>
       <CRow>
          {showAlert &&  <CAlert color={valueAlertColor} visible="true">{valueAlertText}</CAlert>}
        </CRow>
        <CRow>
         <CCol xs={6}>
         <CForm>
           <div className="mb-3">
             <CFormLabel htmlFor="inputtextname">Имя схемы</CFormLabel>
             <CFormInput type="text" id="inputtextname" value={valuesNameTheme}  onChange={handleChangeInputName}  aria-describedby="passwordHelpBlock" placeholder="Наименование схемы" />
           </div>
         </CForm> 
         </CCol>
        </CRow>
        <CRow>
        <CCol xs={12}>
        <CListGroup>
        {valuesListItems.map((items , sIndex) => {
                return (
                    <CListGroupItem id={items.classifictheme_id} onClick={onClickTextBox} component="button" key={sIndex}>{items.name}<CBadge color="secondary">{items.sizetheme}</CBadge></CListGroupItem>
              );
         })}
        </CListGroup>
        </CCol>
        </CRow>
       </CCardBody>
       <CCardBody>
       <CRow className="mb-3">
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
               <CButton  onClick={(e) => {NetworkChangeNameThemeClassific({callbackChangeName} , {showAlertMessage} , valueSelectId , valuesNameTheme)}} color="success" shape="rounded-0">Изменить имя</CButton>
               <CButton onClick={(e) => {NetworkPostAddNewTheme({callbackAddNewRequest} , {showAlertMessage} , valuesNameTheme)}} color="success" shape="rounded-0">Создать новый</CButton>
               <CButton onClick={(e) => {NetworkDeleteThemeClassific({callbackDeleteName} , {showAlertMessage} , valueSelectId)}}  color="danger" shape="rounded-0">Удалить</CButton>
          </div>
        </CRow>
        </CCardBody>
    </CCard>
    </>
  )
}

export default Workershema
