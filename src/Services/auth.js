
export async function getCurrentUser() {
    
    let request = await fetch('api/v1/admin/whoami', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })

    let json = await request.json()

    return json
};

export async function postAuth(login, password){
    let request = await fetch('api/v1/admin/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    })
    let json = await request.json();
    return json;
};

export async function logout(){
    let request = await fetch('api/v1/admin/logout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    })
    let json = await request.json();
    return json;
}
