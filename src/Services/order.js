export async function getNotCompleted() {
    
    const request = await fetch('api/v1/admin/order/not_completed', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })

    const json = await request.json()

    return json
};