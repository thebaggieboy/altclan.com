import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { USER_TYPES, selectUser } from '../features/user/userSlice'
import { selectBrandUser } from '../features/brands/brandUserSlice'

const useOrder = (url, successCallback, userType) => {
    const user = useSelector(selectUser)
    const router= useRouter()
    const isBrand = userType === USER_TYPES.user
    const mutation = useMutation({
        mutationFn: async ({name_of_item, user_email, name_of_brand, amount_per_item, tracking_number, number_of_items, time}) => {
          
                const res = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({name_of_item, user_email, name_of_brand, amount_per_item, tracking_number, number_of_items, time} ),
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

            } ,
            onSuccess: (data) => {
                
                //router.push(`/brands/profile/${brand.id}`)
                console.log(data)
            }
        
       
    })

    return mutation
}

export default useOrder