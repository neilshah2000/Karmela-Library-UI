import React, {useEffect} from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CRow
} from '@coreui/react'
import { useDispatch, useSelector} from 'react-redux'
import { userActivate } from './../../../state/user.actions'

const Activate = ({match}) => {
    const message = useSelector(state => state.user.message)
    const dispatch = useDispatch()
    useEffect(() => {
        const uid = match.params.uid
        const token = match.params.token
        dispatch(userActivate(uid, token))
    }, [dispatch])
    
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
            <CRow className="justify-content-center">
                <CCol md="9" lg="7" xl="6">
                    <CCard className="mx-4">
                        <CCardHeader><h1>Activate</h1></CCardHeader>
                        <CCardBody className="p-4">
                            { message }
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
