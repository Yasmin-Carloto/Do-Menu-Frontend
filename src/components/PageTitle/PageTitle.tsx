import { useToken } from "@/contexts/TokenContext";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface PageTitleProps {
    text: string,
    isMenu: boolean,
}

function PageTitle({text, isMenu}: PageTitleProps) {
    const {token} = useToken()

    return (
        <div className={`flex my-4 items-center ${isMenu ? "lg:justify-around justify-between" : "lg:justify-center"}`}>
            <h1 className="text-2xl lg:text-3xl font-bold">{text}</h1>
            {isMenu && 
                <Link 
                    to={token ? "/add-item" : "/"} 
                    className={`${token ? "bg-orange-600 hover:bg-orange-400" : "bg-zinc-600"} flex justify-center items-center gap-2 p-1 px-2 lg:text-lg text-white rounded-3xl`}
                >
                    <FaPlus size={16} className="text-sm"/>
                    adicionar item
                </Link>
            }
        </div>
    )
}

export default PageTitle