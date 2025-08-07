const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/user`

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        const data = await res.json()
        if (data.err) {
            throw new Error(data.err)
        }
        return data
    } catch (err) {
        console.log(err.message);
    }
}

const deleteUser = async (employeeId) => {
    try {
        console.log(`${BASE_URL}/${employeeId}`);
        const res = await fetch(`${BASE_URL}/${employeeId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await res.json()
        if (data.err) {
            throw new Error(data.err)
        }
        return data
    } catch (err) {
        console.log(err.message);
    }
}

const update = async (employeeId, formData) =>{
    try {
        const res = await fetch(`${BASE_URL}/${employeeId}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(formData)
        })
        const data = await res.json()
        // console.log('data returned in service', data);
        return data
    } catch (err) {
        console.log(err);
    }
}
export { index, deleteUser, update }