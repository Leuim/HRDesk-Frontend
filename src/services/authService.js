const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`

const signup = async (formData) => {
    try {
        // console.log(formData);
        const res = await fetch(`${BASE_URL}/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        const data = await res.json()
        console.log(data.token);
        if (data.err) {
            throw new Error(data.err)
        }
        if(data.token){
            localStorage.setItem('token', data.token)
            return JSON.parse(atob(data.token.split('.')[1])).payload
        }
        throw new Error('Invalid response from the server')
    } catch (error) {
        console.log(error.message);
    }
}

export {signup}