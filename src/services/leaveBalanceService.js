const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/leaveBalance`

const updateLeaveBalance = async (leavebalanceId, formData) =>{
  const res = await fetch(`${BASE_URL}/${leavebalanceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json()
  if(data.err){
    throw new Error(data.err)
  }
  return data
}

export {updateLeaveBalance}