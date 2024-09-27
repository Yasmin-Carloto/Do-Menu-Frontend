import { FiMenu } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Sidebar from "../Sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "@/contexts/TokenContext";
import { useRestaurant } from "@/contexts/RestaurantContext";

function Header() {
    const {restaurant} = useRestaurant()
    const {token, setToken} = useToken()
    const navigate = useNavigate()

    function handleLogout(){
        setToken("")
        localStorage.removeItem("restaurant_token")
        navigate("/")
        
    }

    return (
        <header className="border rounded-2xl border-orange-300 flex justify-around items-center">

            <Sheet>
                <SheetTrigger className="lg:hidden">
                    <FiMenu className="text-orange-300" size={30}/>
                </SheetTrigger>
                
                <Sidebar restaurant={restaurant}/>
            </Sheet>
       
            <Link
                to="/" 
                className="p-1 flex font-thin text-3xl"
            >
                <h1>Do</h1>
                <h2 className="text-orange-300">Menu</h2>
            </Link>

            <nav className="hidden lg:flex m-4">
                <ul className="flex gap-12 font-semibold items-center">
                    <li className="">
                        {token ?
                            <Link
                            className="text-neutral-700 p-2 hover:text-white hover:bg-orange-500 rounded-xl" 
                            to={`/edit-profile`} 
                            >
                                Perfil
                            </Link>
                        :
                            <Link
                                className="p-2 bg-orange-500 hover:bg-orange-700 rounded-xl text-white" 
                                to={`/signup`} 
                            >
                                Cadastre-se
                            </Link> 
                        }
                        
                    </li>

                    <li className="">
                        {token ?
                            <button 
                                onClick={() => handleLogout()}
                                className="text-orange-500 flex justify-center items-center gap-2 p-2 hover:text-white hover:bg-orange-500 rounded-xl"
                            >
                                <LuLogOut />
                                <p>Logout</p>
                            </button>
                        :
                        <Link 
                            className="text-orange-500 flex justify-center items-center gap-2 p-2 hover:text-white hover:bg-orange-500 rounded-xl"
                            to={`/login`}
                        >
                                <LuLogIn />
                                <p>Login</p>
                        </Link>
                        }
                        
                    </li>
                </ul>
            </nav>

        </header>
    )
}

export default Header