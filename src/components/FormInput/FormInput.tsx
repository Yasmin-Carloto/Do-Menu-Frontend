interface FormInputProps {
    placeholder: string,
    type: string,
    value: string | number | undefined,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    name: string
}

function FormInput({placeholder, type, value, handleChange, name}: FormInputProps) {
    return (
        <input 
            className="w-full border border-gray-300 p-3 rounded-xl"
            placeholder={placeholder} 
            type={type}
            value={value}
            onChange={(event) => handleChange(event)}
            name={name}
        />
    )
}

export default FormInput