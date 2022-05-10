
export async function getCurrentUser() {
    
    const request = await fetch('api/v1/admin/whoami', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })

    const json = await request.json()

    return json
};

export async function postAuth(login, password){
    const request = await fetch('api/v1/admin/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    })
    const json = await request.json();
    return json;
};


