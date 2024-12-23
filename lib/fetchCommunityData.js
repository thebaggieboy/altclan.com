async function fetchProductData(id) {
    const res = await fetch(`https://altclan-brands-api.onrender.com/api/communities/${id}`)
    const data = await res.json()

    if (data.err) {
        const error = data.err
        throw error
    }

    return data

}

export default fetchProductData