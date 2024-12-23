
import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import fetchProfileData from './fetchProfileData'
import { USER_TYPES } from '../features/user/userSlice';

export async function fetchUser() {
    const docCookies = parseCookie(document.cookie)
    console.log("docCookies", docCookies)
    const userType = docCookies.get("user_type")

    const url = userType === USER_TYPES.brand ? "https://altclan-api-v1.onrender.com/dj-rest-auth/user/" : userType === USER_TYPES.user
        && "https://altclan-api-v1.onrender.com/dj-rest-auth/user/"

    const res = await fetch(url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json()

    if (res.status >= 200 && res.status <= 209) {
        const profile = await fetchProfileData(data.pk, userType === USER_TYPES.brand)
        return profile
    }

    const err = { ...data }
    throw err
}