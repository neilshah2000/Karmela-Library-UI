import React, {useState, useEffect} from 'react'
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { activate } from './../../../services/login.service';

const Activate = ({match}) => {
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        const uid = match.params.uid
        const token = match.params.token
        activate(uid, token).then((res) => {
            if (res.status === 204) {
                setSuccess(true)
            }
        }, console.error)
    }, [])
    
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
            <CRow className="justify-content-center">
                <CCol md="9" lg="7" xl="6">
                    <CCard className="mx-4">
                        <CCardHeader><h1>Activate</h1></CCardHeader>
                        <CCardBody className="p-4">
                            { success ? <div>Thank you, your account has been activated</div> : <div>Sorry, activation failed</div>}
                        </CCardBody>
                        <CCardFooter className="p-4">

                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
        </div>
    )
}

export default Activate
