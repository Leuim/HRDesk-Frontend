const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/leaveRequest`

const index = async () => {
    try {
        const res = await fetch(`${BASE_URL}/all-leaves`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await res.json()
        console.log('leaverquest data', data)
        if (data.err) {
            throw new Error(data.err)
        }
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const approve = async (leaveRequestId, leaveType) => {
    try {
        const res = await fetch(`${BASE_URL}/${leaveRequestId}/approve`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                leaveType
            })
        })
        // console.log('leave type:',leaveType, 'days count: ', daysCount);
        const data = await res.json()
        if (data.err) {
            throw new Error(data.err)
        }
        return data.leave
    } catch (error) {
        console.log(error.message)
    }
}

const reject = async (leaveRequestId, rejectionReason) => {
    try {
        const res = await fetch(`${BASE_URL}/${leaveRequestId}/reject`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rejectionReason:rejectionReason})
        })
        const data = await res.json()
        if (data.err) {
            throw new Error(data.err)
        }
        return data.leave
    } catch (error) {
        console.log(error.message)
    }
}


export { index, approve, reject }
