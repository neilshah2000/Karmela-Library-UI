import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow,
    CCardFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { login } from './../../../state/login.actions'

const Login = () => {
    const [loginFailed, setLoginFailed] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loggedIn = useSelector(state => state.login.loggedIn)
    const dispatch = useDispatch()

    if (loggedIn) {
        return <Redirect to='/bookSearch'/>
    }

    function onUsernameChange(e) {
        setUsername(e.target.value);
    }

    function onPasswordChange(e) {
        setPassword(e.target.value);
    }

    function loginClicked(e) {
        e.preventDefault()
        dispatch(login(username, password))
    }


    return (
        <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
            <CRow className="justify-content-center">
            <CCol md="8">
                <CCardGroup>
                <CCard className="p-4">
                    <CCardBody>
                    <CForm >
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name="cil-user" />
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Username" autoComplete="username" onChange={onUsernameChange}/>
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={onPasswordChange}/>
                        </CInputGroup>
                        <CRow>
                        <CCol xs="6">
                            <CButton onClick={loginClicked} color="primary" className="px-4" type='submit'>Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                            <CButton color="link" className="px-0"><Link to="/passwordForgot">Forgot password?</Link></CButton>
                        </CCol>
                        </CRow>
                    </CForm>
                    </CCardBody>
                    {loginFailed && <CCardFooter>
                        Login Failed
                    </CCardFooter>}
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                    <CCardBody className="text-center">
                    <div>
                        <h2>Sign up</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                        <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                        </Link>
                    </div>
                    </CCardBody>
                </CCard>
                </CCardGroup>
            </CCol>
            </CRow>
        </CContainer>
        </div>
    )
}

export default Login
