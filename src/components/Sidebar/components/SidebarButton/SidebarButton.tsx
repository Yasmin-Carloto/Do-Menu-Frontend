import { IconType } from "react-icons"
import { MdOutlineArrowRight } from "react-icons/md";
import { Link } from "react-router-dom"

interface SidebarButtonProps {
    text: string,
    icon: IconType,
    toPath: string
}

function SidebarButton({text, icon: Icon, toPath, ...restProps}: SidebarButtonProps) {
    return (
        <Link
            className="my-2 flex items-center justify-between bg-zinc-200 rounded-2xl hover:text-orange-500 hover:bg-orange-100" 
            to={toPath}
            {...restProps}
        >
            <div className="flex items-center justify-center gap-1 text-neutral-500 p-1 px-2">
                <Icon size={24} />
                <p className="text-lg">{text}</p>
            </div>
            <MdOutlineArrowRight size={20} className="text-zinc-500"/>
        </Link>
    )
}

export default SidebarButton