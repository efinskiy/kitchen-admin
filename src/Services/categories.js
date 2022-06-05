export async function getCategories() {
    
    let request = await fetch('api/v1/admin/category', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })

    let json = await request.json()

    return json
};
