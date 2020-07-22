import React from 'react';
import { useSelector } from 'react-redux'
const styles = {
    zIndex: 9,
    top: '50%',
    right: '50%',
    marginTop: -16,
    marginRight: -16
}

const Spinner = () => {
    const spinner = useSelector(state => state.spinner)
    console.log(spinner)

    return <>
        {spinner > 0 &&
            <div className="spinner-border text-primary position-fixed d-block" style={styles} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        }
    </>
}

export default Spinner;