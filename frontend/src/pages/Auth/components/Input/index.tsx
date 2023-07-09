import './styles.css';

type InputProps<T> = 
{
    placeholder: string;
    type: string;
    register: any;
    name: keyof T;
    errors: any;
};
  
function Input<T>({ placeholder, type, register, name, errors } : InputProps<T>)
{
    return (

        <div className="container">

            <input
                type={type}
                placeholder={placeholder}
                className="input"
                {...register(name)}
            />
            
            {errors[name] && <span className="error">{errors[name].message}</span>}
        
        </div>
    );
}

export default Input