//import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { useState } from 'react';



export default async function handler(req, res) {

    //const externalApiUrl = 'http://127.0.0.1:8000/api/users/'

	const externalApiUrl = fetch('https://altclan-api-v1.onrender.com/api/merchandises/')
    let { username, email, password } = req.body;
    await fetch(externalApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, email, password }),
    })
        .then(async (response) => {
            if (response.status >= 200 && response.status <= 209) {
                const data = await response.json()
                console.log("Access token: ", data.access)
                const token = data.access
                const expires = new Date();
                expires.setTime(expires.getTime() + 2 * 24 * 60 * 60 * 1000);
                const cookie = `token=${token};expires=${expires.toUTCString()};path=/;httpOnly;`;
                res.setHeader("Set-Cookie", cookie);
                res.status(response.status).json({ message: " user created" });
                return
            }
            const data = await response.json()
            res.status(response.status).json({ err: data });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        })

}
