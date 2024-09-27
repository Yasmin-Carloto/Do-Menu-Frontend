import { createRestaurant, deleteRestaurant, updateRestaurant } from "@/api/Restaurant/restaurant"
import ValidationsImage from "@/assets/ValidationsImage"
import Button from "@/components/Button/Button"
import FormInput from "@/components/FormInput/FormInput"
import PageTitle from "@/components/PageTitle/PageTitle"
import { useRestaurant } from "@/contexts/RestaurantContext"
import { useToken } from "@/contexts/TokenContext"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface ProfileFormProps {
    isEditingPage: boolean,
}

function ProfileForm({isEditingPage}: ProfileFormProps) {
    const {restaurant, setRestaurant} = useRestaurant()

    const [restaurantData, setRestaurantData] = useState({
        id: restaurant?.id || "", 
        name: restaurant?.name || "",
        email: restaurant?.email || "",
        password: restaurant?.password || "",
        passwordConfirmation: "",
        phone: restaurant?.phone || "",
        menu: []
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        phone: ""
    })
    const navigate = useNavigate()
    const { token, setToken } = useToken()

    useEffect(() => {
        if (token) {
            setRestaurantData(prevValue => ({
                ...prevValue,
                id: restaurant?.id || "",
                name: restaurant?.name || "",
                email: restaurant?.email || "",
                password: "",
                passwordConfirmation: "",
                phone: restaurant?.phone || "",
                menu: []
            }))
        } else {
            setRestaurantData({
                id: "",
                name: "",
                email: "",
                password: "",
                passwordConfirmation: "",
                phone: "",
                menu: []
            });
        }
    }, [restaurant?.email, restaurant?.id, restaurant?.name, restaurant?.phone, token])

    function validate() {
        const allErrors = {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            phone: ""
        }
    
        if(restaurantData.name == ""){
            allErrors.name = "Campo Nome é obrigatório!"
        }else if(restaurantData.name.length < 3){
            allErrors.name = "Campo Nome precisa ter quatidade de caracteres maior ou igual a 3."
        }else{
            allErrors.name = ""
        }
    
        if(restaurantData.email == ""){
            allErrors.email = "Campo Email é obrigatório!"
        }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(restaurantData.email)){
            allErrors.email = "Campo Email está inválido."
        }else{
            allErrors.email = ""
        }

        if(!/^(?=.*[A-Z])(?=.*\d).{8,15}$/.test(restaurantData.password)){
            allErrors.password = "Campo Senha precisa ter ao menos uma letra maiúscula, pelo menos um dígito e entre 8 a 15 caracteres."
        }else if(restaurantData.password !== restaurantData.passwordConfirmation){
            allErrors.password = "Campos Senha e Confirmação de Senha devem estar iguais."
            allErrors.passwordConfirmation = "Campos Senha e Confirmação de Senha devem estar iguais."
        }else if(restaurantData.passwordConfirmation == ""){
            allErrors.passwordConfirmation = "Campo Confirmação de Senha é obrigatório!"
        }else{
            allErrors.password = ""
            allErrors.passwordConfirmation = ""
        }

        if(restaurantData.phone == ""){
            allErrors.phone = "Campo Telefone é obrigatório!"
        }else if(!/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(restaurantData.phone.toString())){
            allErrors.phone = "Campo Telefone está inválido."
        }else{
            allErrors.phone = ""
        }
    
        return allErrors
      }

      function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target
        setRestaurantData(prevValue => ({
            ...prevValue,
            [name]: value
        }))
      }

      async function handleSubmit(event: React.FormEvent<HTMLFormElement>){                
        event.preventDefault()

        const validationErrors = validate()
        if(isEditingPage){
            if(validationErrors.name !== "" || validationErrors.email !== "" || validationErrors.phone !== ""){
                setErrors(validationErrors)
            }else{
                await handleUpdateRestaurant()
            }
        }else{
            if(validationErrors.name !== "" || validationErrors.email !== "" || validationErrors.password !== "" || validationErrors.passwordConfirmation !== "" || validationErrors.phone !== ""){        
                setErrors(validationErrors)
            }else{
                await handleCreateRestaurant()
            }
        }
      }

      async function handleCreateRestaurant(){
        const inNumberPhone = Number(restaurantData.phone)
        const createdRestaurant = await createRestaurant(restaurantData.name, restaurantData.email, restaurantData.password, restaurantData.passwordConfirmation, inNumberPhone)       
        
        if(createdRestaurant?.response?.data){
            if(createdRestaurant.response.data.success == false){
                const errorMessage = createdRestaurant.response.data.error
                if (errorMessage.includes("There is a restaurant already signed up under")) {                
                    setErrors(prevValue => ({
                        ...prevValue,
                        email: "Este email já está associado a uma conta existente. Tente fazer login."
                    }))
                }
            }
        }else{
            if(createdRestaurant.success !== false){
                setToken(createdRestaurant.token)            
                navigate("/")
            }
        }
      }

      async function handleUpdateRestaurant() {
        const updatedRestaurant = await updateRestaurant(token, restaurantData.name, restaurantData.email, Number(restaurantData.phone))
        setRestaurantData(updatedRestaurant.response)
        navigate("/")
      }

      async function handleDeleteRestaurant() {
        setToken("")
        localStorage.removeItem("restaurant_token")
        await deleteRestaurant(token)
        setRestaurant(undefined)
        setRestaurantData({
            id: "", 
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            phone: "",
            menu: []
        });

        navigate("/")
      }

    return (
        <main className="m-4">
            <PageTitle text={isEditingPage ? "Editar Perfil" : "Cadastre-se"} isMenu={false} />

            <section className="flex flex-col lg:flex-row lg:justify-around lg:items-center">
                <ValidationsImage />

                <form className="flex flex-col gap-8 lg:w-1/2 my-4" onSubmit={(event) => handleSubmit(event)}>
                    <div>
                        {isEditingPage && <h3 className="font-semibold text-lg py-2">Nome</h3>}
                        <FormInput placeholder="Nome" type="text" value={restaurantData.name} handleChange={handleChange} name="name" />
                        {errors.name && <p className="text-orange-700 font-semibold text-center">{errors.name}</p>}
                    </div>

                    <div>
                        {isEditingPage && <h3 className="font-semibold text-lg py-2">Email</h3>}
                        <FormInput placeholder="Email" type="email" value={restaurantData.email} handleChange={handleChange} name="email" />
                        {errors.email && <p className="text-orange-700 font-semibold text-center">{errors.email}</p>}
                    </div>

                    {!isEditingPage &&
                        <div>
                            <FormInput placeholder="Senha" type="password" value={restaurantData.password} handleChange={handleChange} name="password" />
                            {errors.password && <p className="text-orange-700 font-semibold text-center">{errors.password}</p>}
                        </div>
                    }
                    {!isEditingPage && 
                        <div>
                            <FormInput placeholder="Confirmação de senha" type="password" value={restaurantData.passwordConfirmation} handleChange={handleChange} name="passwordConfirmation" />
                            {errors.passwordConfirmation && <p className="text-orange-700 font-semibold text-center">{errors.passwordConfirmation}</p>}
                        </div>
                    }

                    <div>
                        {isEditingPage && <h3 className="font-semibold text-lg py-2">Telefone</h3>}
                        <FormInput placeholder="Telefone Ex: 85900000000" type="tel" value={restaurantData.phone} handleChange={handleChange} name="phone" />
                        {errors.phone && <p className="text-orange-700 font-semibold text-center">{errors.phone}</p>}
                    </div>

                    <Button text={isEditingPage ? "Salvar" : "Criar Conta"}/>

                    {isEditingPage && 
                    <button 
                        onClick={() => handleDeleteRestaurant()}
                        className="text-center text-orange-700 underline font-semibold text-lg"
                    >
                        Excluir conta
                    </button>}
                </form>

            </section>
        </main>
    )
}

export default ProfileForm