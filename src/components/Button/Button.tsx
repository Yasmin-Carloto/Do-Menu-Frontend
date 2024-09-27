interface ButtonProps {
    text: string
}

function Button({text}: ButtonProps) {
    return (
        <button className="m-8 p-2 text-white font-semibold text-lg bg-orange-600 rounded-xl">
            {text}
        </button>
    )
}

export default Button