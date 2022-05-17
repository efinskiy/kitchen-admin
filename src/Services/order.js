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

    if (json.code === 200){
        return json;
    }
    if (json.code === 201){
        let alertString = "Недостаточно товара для подтверждения заказа\nЗаказ был отменен.\n";
        json.items.map((item) => alertString+=`${item.title} | ${item.before}шт -> ${item.after}шт\n`)
        alert(alertString);
    }

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

export async function historyOrders(){
    let request = await fetch('api/v1/admin/order/history', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })

    let json = await request.json()
    return json

}