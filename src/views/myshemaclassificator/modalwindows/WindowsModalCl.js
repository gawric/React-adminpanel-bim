import React, { useState } from "react";


import {
    CModalFooter,
    CModalHeader,
    CModal,
    CButton,
    CModalTitle,
    CModalBody,
  } from '@coreui/react'



const ModalWindows = () => {
const [visible, setVisible] = useState(false)
return (
  <>
    <CButton color="info" onClick={() => setVisible(!visible)}>Список поиска</CButton>
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Добавить слова</CModalTitle>
      </CModalHeader>
      <CModalBody>Здесь мы будем добавлять слова и всякую другую еруну</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  </>
 )
}

export default ModalWindows; 