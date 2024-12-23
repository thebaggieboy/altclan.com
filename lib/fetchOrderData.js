async function fetchOrderData(id) {
    const res = await fetch(`altclan-api-v1.onrender.com/api/orders/${id}`)
    const data = await res.json()

    if (data.err) {
        const error = data.err
        throw error
    }

    return data

}

export default fetchOrderData