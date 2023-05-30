import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeLogin } from '../../utils/request';
import { useState } from 'react';
import { saveSessionData } from '../../utils/auth';
import history from '../../utils/history'
import './styles.css';

type FormState = 
{
  username: string;
  password: string;
}

const Auth = () => {
  const { register, handleSubmit } = useForm<FormState>();
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();


  const onSubmit = (data: FormState) => 
  { 
    makeLogin(data)
      .then(response => 
      {
        setHasError(false);
        saveSessionData(response.data);
        //history.replace('/')
        navigate('/')
      })
      .catch(() => 
      {
        setHasError(true);
      })
  }

  return (
    <div className='auth-container'>
      {hasError && (
        <p className='input'>
          Usuário ou senha inválidos
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>

        <input className='input'
        {
          ...register("username",
          {
            required: "Campo obrigatório",
            pattern: 
            {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido"
            }
          })
        }
        type="email"
        placeholder="Email"
        name= "username"
        />


        <input className='input'
        {
          ...register("password", 
          { 
            required: "Campo obrigatório", 
            minLength: 5 
          })
        }
        type="password"
        placeholder="Senha"
        name="password"
        
        />
        
        <button className='input'> Logar </button>

      </form>
    </div>
  )
}

export default Auth;