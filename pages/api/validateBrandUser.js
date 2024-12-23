import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export default function handler(req, res) {

    try {
        const claims = jwt.verify(req.cookies.brand_token, "secretkey")
        res.status(200).json({ email: claims.email })
    } catch (error) {
        res.status(401).json({ message: "brand user unauthorized", error })
    }

}