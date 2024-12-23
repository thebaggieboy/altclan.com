//import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { useRouter, useContext } from "next/router";


export default async function handler(req, res) {
	const externalApiUrl = "http://127.0.0.1:8000/dj-rest-auth/registration/";
	//const externalApiUrl = "https://altclan-api-v1.onrender.com/api/brand_users/";

	let {  Username, Email, Password1, Password2  } = req.body;
	
    await fetch(externalApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({  Username, Email, Password1, Password2  }),
    })
        .then(async (response) => {
            if (response.status >= 200 && response.status <= 209) {
                //setCookie("brand_token", token);
                res.status(response.status).json({ message: "brand user created" });
                return
            }
            const data = await response.json()
            res.status(response.status).json({ err: data });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        })


}
