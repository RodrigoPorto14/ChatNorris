import './styles.css'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom';
import { makeLogin } from '../../../utils/request';
import { saveSessionData } from '../../../utils/auth';
import { useState } from 'react';
import Container from '../components/Container';
import Input from '../components/Input';
import Button from '../components/Button';

const loginUserFormSchema = z.object(
{
    username: z.string()
               .nonempty('Preencha este campo')
               .email('E-mail inválido'),
    
    password: z.string()
               .nonempty('Preencha este campo')
})

export type LoginUserFormData = z.infer<typeof loginUserFormSchema>

const Login = () =>
{

    const [invalidUser, setInvalidUser] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState : { errors } } = useForm<LoginUserFormData>({resolver: zodResolver(loginUserFormSchema)});

    const onSubmit = (data : LoginUserFormData) =>
    {
        makeLogin(data)
        .then(response => 
        {
          if(response.data.active)
          {
            setInvalidUser(false);
            saveSessionData(response.data);
            navigate(0);
          }
          else
            setInvalidUser(true);

        }).catch(() => { setInvalidUser(true); });
    }

    return(

        <Container onSubmit={handleSubmit(onSubmit)}>

                <Input<LoginUserFormData>
                    placeholder="Email"
                    type="email"
                    register={register}
                    name="username"
                    errors={errors}
                />

                <Input<LoginUserFormData>
                    placeholder="Senha"
                    type="password"
                    register={register}
                    name="password"
                    errors={errors}
                />

                <Button> Entrar </Button>

                <Link className="to-register" to="/register">
                    Não possui uma conta? Cadastre-se
                </Link>

        </Container>
        
    )
}

export default Login;