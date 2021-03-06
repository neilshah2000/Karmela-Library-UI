import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CBadge,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const TheHeader = () => {
    const dispatch = useDispatch()
    const sidebarShow = useSelector(state => state.sidebarShow)
    const user = useSelector(state => state.user.me)
    const basketCount = useSelector(state => state.books.basket.length)

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
        dispatch({type: 'set', sidebarShow: val})
    }

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
        dispatch({type: 'set', sidebarShow: val})
    }

    return (
        <CHeader withSubheader>
            <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={toggleSidebarMobile}
            />
            <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={toggleSidebar}
            />
            <CHeaderBrand className="mx-auto d-lg-none" to="/">
                <CIcon name="logo" height="48" alt="Logo"/>
            </CHeaderBrand>

            {/* CSS in this section pushes email and basket icon bellow to the right */}
            <CHeaderNav className="d-md-down-none mr-auto">
            </CHeaderNav>

            {user && user.email && 
                <CHeaderNav className="mr-5">{user.email}</CHeaderNav>}

            <CHeaderNav className="mr-5">
                <CLink to='/basket'>
                    <CIcon name="cil-basket"/>
                    <CBadge shape="pill" color="danger">{basketCount}</CBadge>
                </CLink>
            </CHeaderNav>
            
        </CHeader>
    )
}

export default TheHeader
