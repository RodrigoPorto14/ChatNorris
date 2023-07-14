import './styles.css';

type InputProps<T> = 
{
    placeholder: string;
    type: string;
    register: any;
    name: keyof T;
    errors: any;
    invalidUser? : boolean;
};
  
function Input<T>({ placeholder, type, register, name, errors, invalidUser = false } : InputProps<T>)
{
    return (

        <div className="container">

            <input
                type={type}
                placeholder={placeholder}
                className="input"
                {...register(name)}
            />
            
            {invalidUser && <span className="error"> Usuário e senha invalidos </span>}
            {!invalidUser && errors[name] && <span className="error">{errors[name].message}</span>}
        
        </div>
    );
}

export default Input