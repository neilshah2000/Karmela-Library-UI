import React from 'react';
import {
    CToaster,
    CToast,
    CToastHeader,
    CToastBody
} from '@coreui/react';
import { useSelector } from 'react-redux'

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
                        fade={true}>
                        <CToastHeader >
                            Toast title
                        </CToastHeader>
                        <CToastBody>
                            {toast.status}
                        </CToastBody>
                    </CToast>
                })}
            </CToaster>
        </>
    )
}

export default Toast;