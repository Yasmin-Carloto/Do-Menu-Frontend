import axios from "axios"

const baseURL = "http://localhost:3000/restaurant"
const Axios = axios.create({
    baseURL: baseURL,
    timeout: 3000
})

export async function createRestaurant(restaurantName: string, restaurantEmail: string, restaurantPassword: string, restaurantPasswordConfirmation: string, restaurantPhone: number) {
    const payload = {
        name: restaurantName,
        email: restaurantEmail,
        password: restaurantPassword,
        passwordConfirmation: restaurantPasswordConfirmation,
        phoneNumber: restaurantPhone,
    }

    try {
        const { data } = await Axios.post(
            "/register", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        return data
    } catch (error) {
        console.error(error)
        return error
    }
}

export async function restaurantLogin(restaurantEmail: string, restaurantPassword: string) {
    const payload = {
        email: restaurantEmail,
        password: restaurantPassword
    }

    try {
        const { data } = await Axios.post(
            "/login", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        return data
    }catch(error){
        console.error(error)
        return error
    }
}

export async function getRestaurantById(authToken: string | null){
    try{        
        const { data } = await Axios.get(
            "/", {
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

export async function updateRestaurant(authToken: string | null, restaurantName: string, restaurantEmail: string, restaurantPhone: number) {
    const payload = {
        name: restaurantName,
        email: restaurantEmail,
        phoneNumber: restaurantPhone,
    }

    try {
        const { data } = await Axios.put(
            "/", payload, {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }
        )

        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function deleteRestaurant(authToken: string | null){
    try {
        const { data } = await Axios.delete(
            "/", {
                headers: {
                    "Authorization": `Bearer ${authToken}`
                }
            }
        )

        return data
    }catch(error){
        console.log(error)
        return error
    }
}