import React from 'react'

import ReactDom from 'react-dom'

const MODEL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgb(34,34,34)',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    height: '90%',
    width: '90%'
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    rigth: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

export default function Model({children, onClose}) {
  return ReactDom.createPortal(
    <>
    <div style={OVERLAY_STYLES}></div>
    <div style={MODEL_STYLES}>
        <button className='btn' style={{ marginLeft: "1190px",marginTop:"1px", width:"40px"}} onClick={onClose}> X </button>
        {children}
    </div>
    </>,
    document.getElementById('cart-root')
  )
}
