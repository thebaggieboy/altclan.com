async function fetchOrderData(id) {
    const res = await fetch(`https://altclan-api.onrender.com/api/users/${id}/`)
    const data = await res.json()

    if (data.err) {
        const error = data.err
        throw error
    }

    return data

}

export default fetchOrderData