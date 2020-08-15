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
import { passwordForgot } from './../../../services/login.service';

const PasswordForgot = ({match}) => {
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState('')

    function onEmailChange(e) {
        setEmail(e.target.value);
    }

    function onSendEmailClicked() {
        passwordForgot(email).then(console.log, console.error)
    }
    
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
            <CRow className="justify-content-center">
                <CCol md="9" lg="7" xl="6">
                    <CCard className="mx-4">
                        <CCardHeader><h1>Forgot Password</h1></CCardHeader>
                        <CCardBody className="p-4">
                            <CForm>
                                <CInputGroup className="mb-3">
                                    <CInputGroupPrepend>
                                    <CInputGroupText>
                                        <CIcon name="cil-user" />
                                    </CInputGroupText>
                                    </CInputGroupPrepend>
                                    <CInput type="text" placeholder="Email" onChange={onEmailChange}/>
                                </CInputGroup>
                                
                                <CButton onClick={onSendEmailClicked} color="success" block>Send Reset Email</CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
        </div>
    )
}

export default PasswordForgot
