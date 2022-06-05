export async function getProductsByCategory(categoryId) {
    
    let request = await fetch('api/v1/admin/products/list', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            category_id: categoryId
        })
    })

    let json = await request.json()

    return json
};

export async function sendImage(image){
    let data = new FormData();
    data.append('img', image)

    let request = await fetch('api/v1/admin/utils/imgLoader', {
        method: 'POST',
        body: data
    });

    let json = await request.json();
    return json;
};


export async function updateBalance(id, newBalance){
    let request = await fetch('api/v1/admin/product/amount', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            amount: newBalance
        })
    });

    let json = await request.json()
    return json;
}

export async function updateProduct(id, name, weight, img, price, category){
    let request = await fetch('api/v1/admin/product', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            name: name,
            weight: weight,
            img: img,
            price: price,
            category: category
        })
    });

    let json = await request.json();
    if (json.status === 200){
        return true
    }else{
        return false
    }
}
