

export default async function handler(req, res) {
    const externalApiUrl = "https://altclan-api.onrender.com/dj-rest-auth/registration/";
 
    let { username, email, password1, password2 } = req.body;

    console.log(req)

    await fetch(externalApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, email, password1, password2 }),
    })
        .then(async (response) => {
            if (response.status >= 200 && response.status <= 209) {
                const { user, access } = await response.json()
                const token = access
                const expires = new Date();
                expires.setTime(expires.getTime() + 2 * 24 * 60 * 60 * 1000);
                const cookie = `token=${token};expires=${expires.toUTCString()};path=/;httpOnly;`;
                res.setHeader("Set-Cookie", cookie);
                res.status(response.status).json({ email: user.email, id: user.pk });
                return
            }
            const data = await response.json()
            res.status(response.status).json({ err: data });
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ err: err.message });
        })


}
