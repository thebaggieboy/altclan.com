import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { USER_TYPES, selectUser } from '../features/user/userSlice'
import { selectBrandUser } from '../features/brands/brandUserSlice'

const useCheckout = (url, successCallback, userType) => {
    const user = useSelector(selectUser)
    const router = useRouter()
    const isBrand = userType === USER_TYPES.user
    const mutation = useMutation({
        mutationFn: async ({ paystack_charge_id, amount, status, time }) => {

            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ paystack_charge_id, amount, status }),
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await res.json()
            console.log("seen")

            if (res.status >= 200 && res.status <= 209) {
                return data
            }


            const err = { ...data }
            throw { err }

        },
        onSuccess: (data) => {

            //router.push(`/brands/profile/${brand.id}`)
            console.log(data)
        }


    })

    return mutation
}

export default useCheckout