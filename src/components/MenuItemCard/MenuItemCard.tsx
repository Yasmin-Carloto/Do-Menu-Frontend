import { MdOutlineEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import MenuItem from "@/interfaces/MenuItem/MenuItem";
import { useNavigate } from "react-router-dom";
import { deleteCurrentMenuItem } from "@/api/MenuItem/menuItems";
import { useToken } from "@/contexts/TokenContext";

interface MenuItemProps {
    menuItem?: MenuItem | undefined
}

function MenuItemCard({menuItem}: MenuItemProps){
    const {token} = useToken()
    const navigate = useNavigate()

    function handleEditClick(){
        navigate(`/edit-item/${menuItem?._id}`)
    }

    async function handleDeleteClick(){
        await deleteCurrentMenuItem(token, menuItem?._id)
    }

    return (
        <div className="bg-neutral-100 rounded-xl shadow-md flex items-center justify-around flex-wrap p-2 m-2 my-7 w-3/5 lg:w-2/5 lg:m-4">
            <img 
                className="rounded-xl w-24 lg:w-32 h-24 lg:h-32 object-cover"
                src={menuItem?.image} 
                alt={`Imagem de ${menuItem?.name}`}
            />

            <div className="flex flex-col justify-around gap-2 w-2/3">
                <h2 className="text-2xl font-extralight text-center lg:text-left">{menuItem?.name}</h2>
                <div className="flex justify-around lg:justify-start items-center flex-wrap gap-2 lg:gap-8 text-white">
                    <div className="flex gap-1">
                        <p className="font-bold text-orange-600">R$</p>
                        <p className="text-black">{menuItem?.price}</p>
                    </div>
                    <div className="flex justify-center items-center gap-1 lg:gap-4">
                        <button 
                            onClick={() => handleEditClick()}
                            className="flex justify-around items-center bg-yellow-600 hover:bg-yellow-700 p-1 rounded-xl gap-1"
                        >
                            <MdOutlineEdit size={16} />
                            <p>Editar</p>
                        </button>

                        <button 
                            onClick={() => handleDeleteClick()}
                            className="flex justify-around items-center bg-red-600 hover:bg-red-700 p-1 rounded-xl gap-1"
                        >
                            <IoMdTrash size={16} />
                            <p>Excluir</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuItemCard