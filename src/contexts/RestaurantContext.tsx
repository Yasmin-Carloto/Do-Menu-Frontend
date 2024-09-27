import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react'
import Restaurant from '@/interfaces/Restaurant/Restaurant'
import { getRestaurantById } from '@/api/Restaurant/restaurant'
import { useToken } from './TokenContext'

interface RestaurantContextType {
    restaurant: Restaurant | undefined
    setRestaurant: (restaurant: Restaurant | undefined) => void
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined)

export function RestaurantProvider({ children }: { children: ReactNode }) {
    const [restaurant, setRestaurant] = useState<Restaurant | undefined>(undefined)
    const restaurantRef = useRef<Restaurant | undefined>(restaurant);
    const { token } = useToken(); 

    useEffect(() => {
        async function getCurrentRestaurant() {
            if (token) {
                try {
                    const currentRestaurant = await getRestaurantById(token)
                    const newRestaurant = currentRestaurant.response

                    if (restaurantRef.current !== newRestaurant) {
                        restaurantRef.current = newRestaurant
                        setRestaurant(newRestaurant)
                    }
                } catch (error) {
                    console.error("Error fetching restaurant:", error)
                }
            } else {
                setRestaurant(undefined)
            }
        }
        if(token){
            getCurrentRestaurant()
        }
    }, [token, restaurant])

    return (
        <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>
            {children}
        </RestaurantContext.Provider>
    );
}

export const useRestaurant = () => {
    const context = useContext(RestaurantContext)
    if (!context) {
        throw new Error("useRestaurant must be used within a RestaurantProvider")
    }
    return context
};
