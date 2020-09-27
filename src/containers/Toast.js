import React from 'react';
import {
    CToaster,
    CToast,
    CToastHeader,
    CToastBody
} from '@coreui/react';
import { useSelector } from 'react-redux'
import { TOAST_TYPE_ERROR } from './../state/constants'

const Toast = (props) => {
    const toasts = useSelector(state => state.toasts.all)
    console.log(toasts)

    return (
        <>
            <CToaster position='bottom-right'>
                {toasts.map((toast, key) => {
                    return <CToast
                        key={'toast' + key}
                        show={true}
                        autohide={5000}
                        fade={true}
                        className={(toast.type === TOAST_TYPE_ERROR ? 'text-danger' : null)}>
                        <CToastHeader className={(toast.type === TOAST_TYPE_ERROR ? 'text-danger' : null)}>
                            {toast.title}
                        </CToastHeader>
                        <CToastBody>
                            {toast.message}
                        </CToastBody>
                    </CToast>
                })}
            </CToaster>
        </>
    )
}

export default Toast;