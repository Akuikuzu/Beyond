
//src/components/TextFields.tsx

type TextFieldProps = {
    label?: string;
    className?: string;
    
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextFields = ({ label, ...props }: TextFieldProps) => {

    return (
        <div>
          <label className="crud-label">{label}</label>
            <input 
            {...props} 
            className="crud-input"/>
        </div>
    )
}

export default TextFields;