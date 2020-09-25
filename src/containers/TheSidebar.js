import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg
} from '@coreui/react'

import logo from './../assets/karmela.png'
import { logout } from './../services/login.service';
import { useHistory } from "react-router-dom";

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.sidebarShow)
    let history = useHistory();

    function logoutClicked(){
        logout().then((res) => {
            console.log(res);
            history.push('/login');
        }, (err) => {console.log(err)});
    }

    return (
        <CSidebar
        show={show}
        onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
        >
        <CSidebarBrand className="d-md-down-none white" to="/">
            {/* <CIcon
            className="c-sidebar-brand-full"
            name="logo-negative"
            height={35}
            />
            <CIcon
            className="c-sidebar-brand-minimized"
            name="sygnet"
            height={35}
            /> */}
            <CImg
                src={logo}
                className="c-sidebar-brand-full logo"
                alt="admin@bootstrapmaster.com"/>
        </CSidebarBrand>
        <CSidebarNav>
            <CSidebarNavItem name='Search' to='/bookSearch' icon='cil-search'></CSidebarNavItem>
            {/* <CSidebarNavItem name='Book' to='/book' icon='cil-book'></CSidebarNavItem> */}
            <CSidebarNavItem name='Basket' to='/basket' icon='cil-basket'></CSidebarNavItem>
            <CSidebarNavItem name='My Borrowed' to='/myBorrowed' icon='cil-book'></CSidebarNavItem>
            <CSidebarNavItem name='Logout' onClick={logoutClicked} icon='cil-account-logout'></CSidebarNavItem>
            {/* <CCreateElement
            items={navigation}
            components={{
                CSidebarNavDivider,
                CSidebarNavDropdown,
                CSidebarNavItem,
                CSidebarNavTitle
            }}
            /> */}
        </CSidebarNav>
        <CSidebarMinimizer className="c-d-md-down-none"/>
        </CSidebar>
    )
}

export default React.memo(TheSidebar)
