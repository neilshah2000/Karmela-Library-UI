import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { userRegister, userUpdateMessage} from './../../../state/user.actions'


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const message = useSelector(state => state.user.message)
    const dispatch = useDispatch()

    function onEmailChange(e) {
        setEmail(e.target.value);
    }

    function onPasswordChange(e) {
        setPassword(e.target.value);
    }

    function onRetypePasswordChange(e) {
        setRetypePassword(e.target.value);
    }

    const registerClicked = () => {
        if(password === retypePassword) {
            dispatch(userRegister(email, password))
        } else {
            dispatch(userUpdateMessage('Passwords must match'))
        }
    }
    
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
            <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
                <CCard className="mx-4">
                <CCardBody className="p-4">
                    <CForm>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Email" autoComplete="email" onChange={onEmailChange}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                        <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" autoComplete="new-password" onChange={onPasswordChange}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                        <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Repeat password" autoComplete="new-password" onChange={onRetypePasswordChange}/>
                    </CInputGroup>
                    <CButton onClick={registerClicked} color="success" block>Create Account</CButton>
                    </CForm>
                </CCardBody>
                <CCardFooter>{message}</CCardFooter>
                </CCard>
            </CCol>
            </CRow>
        </CContainer>
        </div>
    )
}

export default Register
