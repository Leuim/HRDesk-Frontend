import React from 'react'

const EditUserForm = ({selectedEmployee,setIsFromOn}) => {
  return (
    <>
    <button onClick={()=> setIsFromOn(false)}>Cancel</button>
    </>
  )
}

export default EditUserForm