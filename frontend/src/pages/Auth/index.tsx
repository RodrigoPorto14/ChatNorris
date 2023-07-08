import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeLogin, makeSignUp} from '../../utils/request';
import { useState } from 'react';
import { saveSessionData } from '../../utils/auth';
import './styles.css';

type FormState = 
{
  nickname: string;
  username: string;
  password: string;
}

const Auth = () => 
{
  const { register, handleSubmit } = useForm<FormState>();
  const [hasError, setHasError] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data: FormState) => 
  {
    if (isSignUp) 
    {
      navigate(0);
      makeSignUp(data)
        .then(response => 
        {
          setHasError(false);
          saveSessionData(response.data);
        })
        .catch(() => { setHasError(true); });  
    } 
    else 
    {
      makeLogin(data)
        .then(response => 
        {
          if(response.data.active)
          {
            setHasError(false);
            saveSessionData(response.data);
            navigate(0);
          }
          else
            setHasError(true);

        }).catch(() => { setHasError(true); });
    }
  };

  const toggleSignUp = () => 
  {
    setIsSignUp(!isSignUp);
    setHasError(false);
  };

  return (
    <div className='auth-container'>
      <h1 className="centered-h1">ChatNorris</h1>
      {hasError && <p className='input'>Usuário inexistente ou inválido</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
      {isSignUp && (
          <input
            {...register('nickname', {
              required: 'Campo obrigatório'
            })}
            className='input'
            type='text'
            placeholder='Apelido'
            name='nickname'
          />
        )}
        
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
        
        <button className='input'>{isSignUp ? 'Cadastrar' : 'Logar'}</button>
      </form>

      <p className='toggle-signup' onClick={toggleSignUp}>
        {isSignUp ? 'Já possui uma conta? Faça login' : 'Não possui uma conta? Cadastre-se'}
      </p>
    </div>
  );
};

export default Auth;
