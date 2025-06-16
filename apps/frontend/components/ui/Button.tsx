"use client"

interface ButtonProps {
    text: string;
    onClick: () => void;
}

export default function Button({text, onClick}: ButtonProps) {
    return <button 
    onClick={onClick}
    className="px-8 py-3 border border-black text-black font-medium rounded-full hover:bg-black hover:text-white cursor-pointer transition-colors duration-300">
        {text}
    </button>
}