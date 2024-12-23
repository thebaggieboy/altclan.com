import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { USER_TYPES, setUser, setUserType } from '../features/user/userSlice'
import fetchProfileData from '../lib/fetchProfileData'


const useDjoserSignup   = (url, successCallback, userType) => {
    const isBrand = userType === USER_TYPES.brand

    const mutation = useMutation({
        mutationFn: async ({ email, password }) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email:email, password:password }),
                credentials: "include"

            })
            const data = await res.json()

            if (res.status >= 200 & res.status <= 209) {
                const id = data.user.pk
                const profile = await fetchProfileData(id, isBrand)
                return profile
                return
            }

            const error = { ...data }
            throw error
        },
        onSuccess: (user) => {
            successCallback(user)
        }
    })

    return mutation
}

export default useDjoserSignup  