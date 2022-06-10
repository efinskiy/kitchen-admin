export async function getUsers() {
    
    let request = await fetch('api/v1/admin/user/all', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })

    let json = await request.json()

    return json
};


export async function changePassword(oldPassword, newPassword) {
    
    let request = await fetch('api/v1/admin/user/changePassword', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
                currentPassword: oldPassword,
                newPassword: newPassword
        })
    })

    let json = await request.json()

    return json
};

export async function editUser(user, is_admin, is_kitchen, passwordChanged, newPassword) {
    let body = ""

    if (passwordChanged === true){
        body = JSON.stringify({
                user: user,
                is_admin: is_admin,
                is_kitchen: is_kitchen,
                newPassword: newPassword
        })
    }else{
        body = JSON.stringify({
            user: user,
            is_admin: is_admin,
            is_kitchen: is_kitchen
    })
    }

    let request = await fetch('api/v1/admin/user/edit', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }, 
        body: body
    })

    let json = await request.json()

    return json
};

export async function deleteUser(userId) {
    
    let request = await fetch('api/v1/admin/user/delete', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
                id: userId,
        })
    })

    let json = await request.json()

    return json
};

export async function addUser(login, password, is_admin, is_kitchen){
    let request = await fetch('api/v1/admin/user', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
                login: login,
                password: password,
                is_admin: is_admin,
                is_kitchen: is_kitchen
        })
    })

    let json = await request.json()

    return json
}