import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

function FormsLayout() {
    return(
        <div className="m-4">
            <Header />
            <Outlet />
        </div>
    )
}

export default FormsLayout