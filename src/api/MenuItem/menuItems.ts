import axios from "axios"

const baseURL = "http://localhost:3000/restaurant"
const Axios = axios.create({
    baseURL: baseURL,
    timeout: 3000
})

export async function createMenuItem(authToken: string | null, menuItemName: string, menuItemImage: string, menuItemDescription: string, menuItemPrice: number) {
    const payload = {
        name: menuItemName,
        image: menuItemImage,
        description: menuItemDescription,
        price: menuItemPrice
    }

    try{
        const { data } = await Axios.post(
            "/create-new-menu-item", payload, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                }
            }
        )
        return data
    }catch(error){
        console.error(error)
        return error
    }
}

export async function getMenu(authToken: string | null) {
    try{
        const { data } = await Axios.get(
            "/menu", {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }
        )
        return data
    }catch(error){
        console.error(error)
        return error
    }
}

export async function updateCurrentMenuItem(authToken: string | null, menuItemId: string, menuItemName: string, menuItemImage: string, menuItemDescription: string, menuItemPrice: number) {
    const payload = {
        name: menuItemName,
        image: menuItemImage,
        description: menuItemDescription,
        price: menuItemPrice
    }

    try{
        const { data } = await Axios.put(
            `/update/${menuItemId}`, payload, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }
        )

        return data
    }catch(error){
        console.error(error)
        return error
    }
}

export async function deleteCurrentMenuItem(authToken: string | null, menuItemId: string | undefined) {
    try{
        const { data } = await Axios.delete(
            `/delete/${menuItemId}`, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }
        )

        return data
    }catch(error){
        console.error(error)
        return error
    }
}

// Fazer update e delete do MenuItem