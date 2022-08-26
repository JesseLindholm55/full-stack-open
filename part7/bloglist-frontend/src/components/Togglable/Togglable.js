import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

/* eslint-disable no-unused-vars */
const Togglable = React.forwardRef((props, ref) => {
    /* eslint-enable no-unused-vars */
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    useEffect(() => {
        if (props.childrenClose === true) setVisible(false)
    }, [props.childrenClose])

    return (
        <div>
            <div style={hideWhenVisible}>
                <button
                    onClick={() => {
                        setVisible(!visible)
                    }}
                >
                    {props.buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button
                    onClick={() => {
                        setVisible(!visible)
                    }}
                >
                    cancel
                </button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
