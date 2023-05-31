import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeLogin } from '../../utils/request';
import { useState } from 'react';
import { saveSessionData } from '../../utils/auth';
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

  /****************************************************************** 
  Ao enviar o email e senha no formulário é feito a requisição de
  login, caso tenha sucesso, atualiza o estado "hasError" para falso,
  salva o token de autenticação recebido pela requisição no localStorage
  e atualiza a página, caso contrário apenas atualiza o estado "hasError"
  para verdadeiro
  ******************************************************************/
  const onSubmit = (data: FormState) => 
  { 
    makeLogin(data)
      .then(response => 
      {
        setHasError(false);
        saveSessionData(response.data);
        navigate(0)
      })
      .catch(() => 
      {
        setHasError(true);
      })
  }

  return (
    <div className='auth-container'>

      {
        hasError && 
        (
          <p className='input'>
            Usuário ou senha inválidos
          </p>
        )
      }

      <form onSubmit={handleSubmit(onSubmit)}>

        <input 
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
          className='input'
          type="email"
          placeholder="Email"
          name= "username"
            
        />

        <input 
        {
          ...register("password", 
          { 
            required: "Campo obrigatório", 
            minLength: 5 
          })
        }
          className='input'
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