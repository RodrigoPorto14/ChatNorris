import { ReactNode } from "react"
import './styles.css';

type ContainerProps = 
{
    children : ReactNode;
    onSubmit : any;
}

const Container = ({ children, onSubmit } : ContainerProps ) =>
{
    return (

        <div className='auth-container'>

            <div className="form-container">

                <h1>ChatNorris</h1>

                <form noValidate className="form" onSubmit={onSubmit}>

                    { children }

                </form>

            </div>
                
        </div>

    )
}

export default Container