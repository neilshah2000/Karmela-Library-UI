import React, {useState, useEffect} from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector} from 'react-redux'
import { userResetPassword, userUpdateMessage } from './../../../state/user.actions'

const PasswordReset = ({match}) => {
    const message = useSelector(state => state.user.message)
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const dispatch = useDispatch()

    function onPasswordChange(e) {
        setPassword(e.target.value);
    }

    function onRetypePasswordChange(e) {
        setRetypePassword(e.target.value);
    }

    const resetPasswordClicked = () => {
        if(password === retypePassword) {
            dispatch(userResetPassword(match.params.uid, match.params.token, password))
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
                        <CCardHeader><h1>New Password</h1></CCardHeader>
                        <CCardBody className="p-4">
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
                            <CButton onClick={resetPasswordClicked} color="success" block>Reset Password</CButton>
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

export default PasswordReset
