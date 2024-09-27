import { restaurantLogin } from "@/api/Restaurant/restaurant"
import ValidationsImage from "@/assets/ValidationsImage"
import Button from "@/components/Button/Button"
import FormInput from "@/components/FormInput/FormInput"
import PageTitle from "@/components/PageTitle/PageTitle"
import { useToken } from "@/contexts/TokenContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const {setToken} = useToken()

    function validate() {
        const allErrors = {
            email: "",
            password: ""
        }

        if(loginData.email == ""){
            allErrors.email = "Campo Email é obrigatório!"
        }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(loginData.email)){
            allErrors.email = "Campo Email está inválido."
        }else{
            allErrors.email = ""
        }

        if(loginData.password == ""){
            allErrors.password = "Campo Senha é obrigatório!"
        }else if(!/^(?=.*[A-Z])(?=.*\d).{8,15}$/.test(loginData.password)){
            allErrors.password = "Campo Senha precisa ter ao menos uma letra maiúscula, pelo menos um dígito e entre 8 a 15 caracteres."
        }else{
            allErrors.password = ""
        }

        return allErrors
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setLoginData(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const validationErrors = validate()
        if(validationErrors.email !== "" || validationErrors.password !== ""){
            setErrors(validationErrors)
        }else{
            await handleLoginRestaurant()
        }
    }

    async function handleLoginRestaurant() {
        const loggedInRestaurant = await restaurantLogin(loginData.email, loginData.password)
        
        if(loggedInRestaurant?.response?.data.success == false){
            setErrors(prevValue => ({
                ...prevValue,
                password: "Email e/ou Senha está/estão inválido/s."
            }))
            
        }else{
            setToken(loggedInRestaurant.token)
            navigate("/")
        }
    }

    return (
        <main className="m-4">
            <PageTitle text="Login" isMenu={false} />

            <section className="lg:flex lg:justify-center lg:items-center">
                <ValidationsImage />

                <form className="flex flex-col gap-8 lg:w-1/2" onSubmit={(event) => handleSubmit(event)}>
                    <div>
                        <FormInput placeholder="Email" type="text" value={undefined} name="email" handleChange={handleChange} />
                        {errors.email && <p className="text-orange-700 font-semibold text-center">{errors.email}</p>}
                    </div>

                    <div>
                        <FormInput placeholder="Password" type="password" value={undefined} name="password" handleChange={handleChange} />
                        {errors.password && <p className="text-orange-700 font-semibold text-center">{errors.password}</p>}
                    </div>

                    <Button text="Entrar"/>
                </form>
            </section>
        </main>
    )
}

export default Login