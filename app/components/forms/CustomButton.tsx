interface CustomButtonProps {
    label: string;
    onClick?: () => void;
    className?: string;
}


const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    onClick,
    className
}) => {
    return (
        <div
            onClick={onClick}
            className={`py-4 bg-[#ff385c] hover:bg-[#d50027] text-white text-center rounded-xl transition cursor-pointer ${className || 'w-full'}`}
            >       
            {label}
        </div>
    )
}
    
export default CustomButton;
