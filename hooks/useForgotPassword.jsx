import { useMutation } from '@tanstack/react-query'


const useForgotPassword = (isBrand) => {
    const userUrl = "https://altclan-api-v1.onrender.com/dj-rest-auth/password/reset/confirm/"
    const brandUrl = "https://altclan-brands-api.onrender.com/dj-rest-auth/password/reset/confirm/"

    const mutation = useMutation({
        mutationFn: async (loginData) => {
            const res = await fetch(isBrand ? brandUrl : userUrl, {
                method: "POST",
                body: JSON.stringify(loginData),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json()

            if (res.status >= 200 && res.status <= 209) {
                return { message: "password succesfully reset" }
            }

            const err = { ...data }
            throw err
        }
    })

    return mutation
}

export default useForgotPassword