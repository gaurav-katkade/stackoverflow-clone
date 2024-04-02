import React from 'react'

const Avatar = ({
  children,
  px,
  py,
  color,
  borderRadius,
  backgroundColor,
  fontSize,
  cursor,
}) => {
  const style = {
    padding :`${py} ${px}`,
    color:color||'Black',
    borderRadius,
    backgroundColor,
    fontSize,
    textAlign:'center',
    cursor:cursor || null
  }
  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Avatar
