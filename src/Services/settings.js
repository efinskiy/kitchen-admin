export async function getSettings() {
    
    const request = await fetch('api/v1/admin/settings', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })

    const json = await request.json()

    return json
};

export async function changeSettings(key, value){

    const request = await fetch('api/v1/admin/settings', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            key: key,
            value: value
        })
    })

    const json = await request.json()

    return json

}