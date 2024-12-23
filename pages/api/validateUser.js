
export default async function handler(req, response) {
    const res = await fetch("https://altclan-api.onrender.com/dj-rest-auth/user/", {
        credentials: "include"
    })
    const data = await res.json()
    console.log("Validate User: ", data)
    response.status(res.status).json(data)
}