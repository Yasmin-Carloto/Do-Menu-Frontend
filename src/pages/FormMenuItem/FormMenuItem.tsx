import { createMenuItem, getMenu, updateCurrentMenuItem } from "@/api/MenuItem/menuItems"
import ValidationsImage from "@/assets/ValidationsImage"
import Button from "@/components/Button/Button"
import FormInput from "@/components/FormInput/FormInput"
import PageTitle from "@/components/PageTitle/PageTitle"
import { useToken } from "@/contexts/TokenContext"
import MenuItem from "@/interfaces/MenuItem/MenuItem"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

interface FormMenuItemProps {
    menuItem: MenuItem | undefined
}

function FormMenuItem({menuItem}: FormMenuItemProps) {
    const [menuItemData, setMenuItemData] = useState({
        name: menuItem?.name || "",
        image: menuItem?.image || "",
        description: menuItem?.description || "",
        price: menuItem?.price || 0
    })

    const [errors, setErrors] = useState({
        name: "",
        image: "",
        description: "",
        price: ""
    })

    const {token} = useToken()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        async function getInfoFromCurretntMenuItem(){
            const currentMenuItem: MenuItem = await getMenuItem()
            setMenuItemData(prevValue => ({
                ...prevValue,
                name: currentMenuItem.name,
                image: currentMenuItem.image,
                description: currentMenuItem.description,
                price: currentMenuItem.price
            }))
        } 

        async function getMenuForRestaurant() {
            const menu = await getMenu(token)
            const treatedMenu = await menu.menu
            return treatedMenu
        }

        async function getMenuItem() {
            const menu = await getMenuForRestaurant()
            let currentMenuItem: MenuItem
            
            menu.forEach((menuItemElement: MenuItem) => {
                if(menuItemElement._id == id){
                    currentMenuItem = menuItemElement
                }
            })

            return currentMenuItem
        }

        if(id !== undefined){
            getInfoFromCurretntMenuItem()
        }
    }, [id, token])

    function validate() {
        const allErrors = {
            name: "",
            image: "",
            description: "",
            price: ""
        }

        if(menuItemData.name == ""){
            allErrors.name = "Campo Nome é obrigatório!"
        }else if(menuItemData.name.length < 3){
            allErrors.name = "Campo Nome deve possuir pelo menos 3 caracteres."
        }else{
            allErrors.name = ""
        }

        if(menuItemData.image == ""){
            allErrors.image = "Campo Imagem é obrigatório!"
        }else{
            allErrors.image = ""
        }

        if(menuItemData.description == ""){
            allErrors.description = "Campo Descrição é obrigatório!"
        }else if(menuItemData.description.length <= 9){
            allErrors.description = "Campo Descrição deve possuir pelo menos 10 caracteres."
        }else{
            allErrors.description = ""
        }

        if(menuItemData.price < 1){
            allErrors.price = "Campo Preço deve ser maior do que 0."
        }else if(isNaN(menuItemData.price)){
            allErrors.price = "Campo Preço deve ser um número."
        }else{
            allErrors.price = ""
        }

        return allErrors
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setMenuItemData(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        const validationsErrors = validate()
        if(validationsErrors.name !== "" || validationsErrors.image !== "" || validationsErrors.description !== "" || validationsErrors.price !== ""){
            setErrors(validationsErrors)
        }else{
            if(id == undefined){
                await createMenuItem(token, menuItemData.name, menuItemData.image, menuItemData.description, menuItemData.price)
                navigate("/")
            }else{
                await updateCurrentMenuItem(token, id, menuItemData.name, menuItemData.image, menuItemData.description, menuItemData.price)
                navigate("/")
            }
        }
    }

    return (
        <main className="m-4">
            <PageTitle text={menuItem == undefined ? "Adicionar novo item" : "Editar item"} isMenu={false} />

            <section className="lg:flex lg:justify-center lg:items-center">
                <ValidationsImage />

                <form className="flex flex-col gap-8 lg:w-1/2" onSubmit={(event) => handleSubmit(event)}>
                    <div>
                        <FormInput placeholder="Nome" type="text" value={menuItemData?.name} handleChange={(event) => handleChange(event)} name="name" />
                        {errors.name && <p className="text-orange-700 font-semibold text-center">{errors.name}</p>}
                    </div>

                    <div>
                        <FormInput placeholder="Imagem" type="url" value={menuItemData?.image} handleChange={(event) => handleChange(event)} name="image" />
                        {errors.image && <p className="text-orange-700 font-semibold text-center">{errors.image}</p>}
                    </div>

                    <div>
                        <FormInput placeholder="Descrição" type="text" value={menuItemData?.description} handleChange={(event) => handleChange(event)} name="description" />
                        {errors.description && <p className="text-orange-700 font-semibold text-center">{errors.description}</p>}
                    </div>
                    
                    <div>
                        <FormInput placeholder="Preço" type="text" value={menuItemData?.price} handleChange={(event) => handleChange(event)} name="price" />
                        {errors.price && <p className="text-orange-700 font-semibold text-center">{errors.price}</p>}
                    </div>

                    <Button text="Salvar"/>
                </form>
            </section>
        </main>
    )
}

export default FormMenuItem