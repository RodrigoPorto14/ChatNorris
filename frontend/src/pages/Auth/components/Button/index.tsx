import { ReactNode } from 'react'
import './styles.css'

type ButtonProps =
{
    children : ReactNode;
}

const Button = ( { children } : ButtonProps) =>
{
    return(

        <button className="button" >

            {children}

        </button>

    )
}

export default Button