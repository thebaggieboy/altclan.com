import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { USER_TYPES, selectUser, setUser, setUserType } from '../features/user/userSlice'
import fetchProfileData from '../lib/fetchProfileData'
import { selectUserEmail } from '../features/user/userActiveEmail'
import { selectToken, setToken } from '../features/token/tokenSlice'




const useBrandSignup = (url, successCallback, userType) => {
    const isBrand = userType === USER_TYPES.brand
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)
    const user_email = useSelector(selectUserEmail)
    const dispatch = useDispatch()  

    const mutation = useMutation({
        mutationFn: async ({username, email, password}) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {

                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password:password}),
                credentials: "include"

            })
            const data = await res.json()

            console.log("Access Token: ", data.access)
              
   
            if (res.status >= 200 & res.status <= 209) {
                dispatch(setToken(data?.access))
                const  url2 = "https://altclan-brands-api-1-1.onrender.com/api/users/"
                const res2 =  await fetch(url2, {
                    method: "GET",
                    headers: {
                    
                        "Content-Type": "application/json"
                    },
                })
            
                const data2 = await res2.json()
            
                if (user_email !== null){
                    let filteredUsers = data2.filter((user) => {
                        return user.email === user_email;
                    });
                  
                    
                    dispatch(setUser(filteredUsers))
                    console.log("Current User: ", user)
                }
               
			
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

export default useBrandSignup