

export default function handler(req, res) {

    try {
        const cookie = `token=null;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;httpOnly;`
        res.setHeader('Set-Cookie', cookie);
        res.status(200).json({ message: "logged out" })

    } catch (error) {
        res.status(401).json({ message: "user unauthorized", error })
    }


}