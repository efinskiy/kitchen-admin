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

export async function update(id, title, priority, visible){
    let request = await fetch('api/v1/admin/category', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            title: title,
            priority: priority,
            visible: visible
        })
    });

    let json = await request.json()

    return request.status === 200 ? true : false

};

export async function add(title, priority, visible){
    let request = await fetch('api/v1/admin/category', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            priority: priority,
            visible: visible
        })
    })

    let json = await request.json()

    return request.status === 200 ? true : false
};

export async function deleteCategory(id, transferId){
    let request = await fetch('api/v1/admin/category', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            transferId: transferId
        })
    });

    let response = request.status;

    return response === 200 ? true : false;
};