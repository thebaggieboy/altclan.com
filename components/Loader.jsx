import React from 'react'

const Loader = ({ w = "w-6", h = "h-6" }) => {
    return (
        <span className={`loader ${w} ${h}`}></span>
    )
}

export default Loader