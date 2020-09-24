import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { userForgotPassword } from './../../../state/user.actions'

const PasswordForgot = () => {
    const [email, setEmail] = useState('')
    const message = useSelector(state => state.user.message)
    const dispatch = useDispatch()

    function onEmailChange(e) {
        setEmail(e.target.value);
    }

    function onSendEmailClicked() {
        dispatch(userForgotPassword(email))
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
                        {message && <CCardFooter>
                            {message}
                        </CCardFooter>}
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
        </div>
    )
}

export default PasswordForgot
