import './styles.css';
import { useEffect} from 'react';
import Conversation from '../../types/Conversation'
import { Link,  useNavigate } from "react-router-dom";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makePrivateRequest } from '../../utils/request';
import { getAuthenticatedUserName, logout } from '../../utils/auth';

type MenuProps = 
{
    selectedChatId : string | undefined
    chats : Conversation[]
    setChats : (chats : Conversation[]) => void
}

const Menu = ( {selectedChatId, chats, setChats} : MenuProps ) =>
{
    const navigate = useNavigate()

    /****************************************************************** 
    A cada renderização do componente é feita uma requisição das
    conversas do usuário autenticado mudando o estado de "chats"
    para a lista de conversas recebidas na requisição
    ******************************************************************/
    useEffect(() => 
    {
        makePrivateRequest({ url: '/chats'})
             .then((response) => { setChats(response.data); })
             .catch((error) => { console.log(error); })
        
    }, []);


    /****************************************************************** 
    Realiza o logout, apagando o token do usuário do localStorage e
    atualiza a página
    ******************************************************************/
    const handleLogout = () =>
    {
        logout();
        navigate(0)
    }

    return(

        <nav className="menu-container">
            
            <Link className='new-chat-button' to="/" >
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                New chat
            </Link>

            <ul className='history-container'>
                {
                    chats.map((chat: Conversation) => (
                    <Link
                        className = {`menu-link ${chat.id.toString() === selectedChatId ? 'active' : ''}`} 
                        to = {`/chats/${chat.id}`}
                        key = {chat.id}> 
                        
                        {chat.title} 
                    </Link>))
                }  
            </ul>

            <div className="perfil-container">*
                <button className="menu-link"> {getAuthenticatedUserName()} </button>
                <button className="menu-link" onClick={handleLogout}> Logout </button>
            </div>

        </nav>
    )
}
export default Menu;