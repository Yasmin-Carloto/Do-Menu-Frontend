import { getMenu } from "@/api/MenuItem/menuItems"
import MenuItemCard from "@/components/MenuItemCard/MenuItemCard"
import PageTitle from "@/components/PageTitle/PageTitle"
import { useToken } from "@/contexts/TokenContext"
import MenuItem from "@/interfaces/MenuItem/MenuItem"
import { useEffect, useState } from "react"

function Home(){
    const [menuItems, setMenuItems] = useState<MenuItem[] | undefined>()
    const {token} = useToken()
    
    useEffect(() => {
        async function getAllMenuItems() {
            const menuItemsResponse = await getMenu(token)
            setMenuItems(menuItemsResponse.menu)
        }

        if(token){
            getAllMenuItems()
        }else{
            setMenuItems(undefined)
        }
    }, [token, menuItems])

    return (
        <main>
            <PageTitle text="Menu" isMenu={true} />
            <div className="flex flex-col justify-center items-center">
                {menuItems?.map((currentMenuItem) => (
                    <MenuItemCard key={currentMenuItem._id} menuItem={currentMenuItem}/>
                ))}
            </div>
        </main>
    )
}

export default Home