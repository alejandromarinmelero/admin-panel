export const Peticion = async (url, method, dataToSave) => {

    let options = {
        method: "GET",
        body: "",
        headers: {}
    }

    switch (method) {
        case 'GET':
            options = {
                method: method,
            }
            break;
        case 'POST':
            options = {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSave),
            }
            break;
        case 'PUT':
            options = {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSave),
            }
            break;
        case 'DELETE':
            options = {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSave),
            }
            break;
        default:
            break;
    }

    const ajax = await fetch(url, options)
    const data = await ajax.json()

    return {
        data
    }
}