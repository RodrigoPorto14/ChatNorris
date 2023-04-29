import './styles.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Menu = () =>
{
    return(

        <>
        <nav className="menu-container">

            <button className='new-chat-button'>
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                New chat
            </button>

            <div className='history-container'>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
                <a href="#a">Teste</a>
            </div>

            <div className="perfil-container">
                <a href="#a">Upgrade to Plus</a>
            </div>

        </nav>
        </>
    )
}
export default Menu;