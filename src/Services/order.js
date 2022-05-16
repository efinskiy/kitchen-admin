export async function getNotCompleted() {
    
    let request = await fetch('api/v1/admin/order/not_completed', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })

    let json = await request.json()

    return json
};

export async function confirmOrder(id){
    let request = await fetch('api/v1/admin/order/confirm', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            oid: id
        })
    })

    let json = await request.json()

    return json
}

export async function cancelOrder(id){
    let request = await fetch('api/v1/admin/order/cancel', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            oid: id,
            reason: 2
        })
    })

    let json = await request.json()
    
    return json
}

export async function closeOrder(id){
    let request = await fetch('api/v1/admin/order/close', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            oid: id
        })
    })

    let json = await request.json()
    
    return json
}