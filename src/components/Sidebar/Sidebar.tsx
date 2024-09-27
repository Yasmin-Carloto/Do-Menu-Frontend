import {
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetTitle,
  } from "@/components/ui/sheet"
import Restaurant from "@/interfaces/Restaurant/Restaurant"
import SidebarButton from "./components/SidebarButton/SidebarButton"
import { MdOutlineMenuBook, MdOutlinePerson  } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "@/contexts/TokenContext";

interface SidebarProps {
    restaurant: Restaurant | undefined
}


function Sidebar({restaurant}: SidebarProps) {
    const {token, setToken} = useToken()
    const navigate = useNavigate()

    function handleLogout(){
        setToken("")
        localStorage.removeItem("restaurant_token")
        navigate("/")
        
    }

    return (
        <SheetContent side={`left`} className="flex flex-col justify-between bg-white">
            {token ?
                <>
                    <div>
                        <SheetTitle className="my-4 p-2 rounded-xl text-white text-xl bg-orange-500">
                            {restaurant && restaurant.name}
                        </SheetTitle>

                        <SheetDescription />

                        <SheetClose asChild>
                            <SidebarButton text="Menu" icon={MdOutlineMenuBook} toPath="/" />
                        </SheetClose>

                        <SheetClose asChild>
                            <SidebarButton text="Dados Pessoais" icon={MdOutlinePerson} toPath="/edit-profile" />
                        </SheetClose>
                    </div>
                    <button 
                        onClick={() => handleLogout()}
                        className="flex items-center gap-3 text-orange-500"
                    >
                        <LuLogOut />
                        <p>Logout</p>
                    </button>
                </>
            :
                <div className="flex flex-col justify-around items-center h-full">
                    <div className="text-center">
                        <SheetTitle className="text-2xl text-zinc-700 font-bold">
                            Se ainda não possui um cadastro,
                        </SheetTitle>
                        <SheetDescription />
                        <SheetClose asChild>
                            <Link
                                to={`/signup`}
                                className="text-2xl text-orange-500 font-bold hover:text-orange-700 underline"
                            >
                                clique aqui e faça já o seu! 
                            </Link>
                        </SheetClose>
                    </div>

                    <SheetClose asChild>
                        <Link 
                            className="text-base underline text-orange-500 hover:text-orange-700"
                            to={`/login`}
                        >
                            Ou clique aqui e faça seu login.
                        </Link>
                    </SheetClose>
                </div>
            }
            
        </SheetContent>
    )
}

export default Sidebar