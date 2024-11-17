import React from 'react'

const Button = ({ value, onClick, className }) => {
  return (
    <div className={className}>
        <input type="button" value={value} onClick={onClick} />
    </div>
  )
}

export default Button