import './styles.css'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom';
import { makeSignUp } from '../../../utils/request';
import { saveSessionData } from '../../../utils/auth';
import Container from '../components/Container';
import Input from '../components/Input';
import Button from '../components/Button';

const registerUserFormSchema = z.object(
    {
        nickname: z.string()
                   .min(4, 'Deve conter no mínimo 4 caracteres')
                   .max(16, 'Deve conter no máximo 16 caracteres')
                   .refine(value => /^[a-zA-Z0-9]*$/.test(value), {message: 'Não pode conter espaços ou caracteres especiais'}),
               
        email: z.string()
                .nonempty('Campo obrigatório')
                .email('E-mail inválido'),
        
        password: z.string()
                   .nonempty('Campo obrigatório')
                   .min(6,'Deve conter no mínimo 6 caracteres'),
        
        confirm: z.string()
                  .nonempty('Campo obrigatório')
                  .min(6,'Deve conter no mínimo 6 caracteres')

    }).refine((data) => data.password === data.confirm, {message: 'As senhas não correspondem', path: ['confirm']})
    
type RegisterUserFormData = z.infer<typeof registerUserFormSchema>

export type RegisterData = 
{
  nickname: String;
  username: String;
  password: String;
}

const Register = () =>
{

    const navigate = useNavigate();
    const { register, handleSubmit, formState : { errors } } = useForm<RegisterUserFormData>({resolver: zodResolver(registerUserFormSchema)});

    const onSubmit = (data : RegisterUserFormData) =>
    {
        const registerData = {nickname : data.nickname, username: data.email, password : data.password}
        navigate(0);
        makeSignUp(registerData)
            .then(response => 
            {
                saveSessionData(response.data);
            })
            .catch(error => { console.log(error) });
    }

    return(

        <Container onSubmit={handleSubmit(onSubmit)}>

                <Input<RegisterUserFormData>
                    placeholder="Apelido"
                    type="text"
                    name="nickname"
                    register={register}
                    errors={errors}
                />

                <Input<RegisterUserFormData>
                    placeholder="Email"
                    type="email"
                    name="email"
                    register={register}
                    errors={errors}
                />

                <Input<RegisterUserFormData>
                    placeholder="Senha"
                    type="password"
                    name="password"
                    register={register}
                    errors={errors}
                />

                <Input<RegisterUserFormData>
                    placeholder="Confirmar Senha"
                    type="password"
                    name="confirm"
                    register={register}
                    errors={errors}
                />

                <Button> Cadastrar </Button>

                <Link className="to-login" to="/login">
                    Já possui uma conta? Faça login
                </Link>

        </Container>
        
    )
}

export default Register;