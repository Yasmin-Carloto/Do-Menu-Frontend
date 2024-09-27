import MenuItem from "../MenuItem/MenuItem"

interface Restaurant {
    id: string | undefined,
    name: string,
    email: string,
    password: string,
    phone: number,
    menu: MenuItem[] | undefined
}

export default Restaurant