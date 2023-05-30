import './styles.css';
import { useEffect} from 'react';
import Conversation from '../../types/Conversation'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makePrivateRequest } from '../../utils/request';
import { getUserAuthenticated, logout } from '../../utils/auth';

type MenuProps = 
{
    selectedChatId : string | undefined
    chats : Conversation[]
    setChats : (chats : Conversation[]) => void
}

const Menu = ( {selectedChatId, chats, setChats} : MenuProps ) =>
{
    useEffect(() => 
    {
        makePrivateRequest({ url: '/chats'})
             .then((response) => { setChats(response.data); })
             .catch((error) => { console.log(error); })
        
    }, []);

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
                        key = {chat.id} 
                    > 
                        {chat.title} 
                    </Link>))
                }  
            </ul>

            <div className="perfil-container">
                <button className="menu-link" >{getUserAuthenticated()}</button>
                <button className="menu-link" onClick={logout} >Logout</button>
            </div>

        </nav>
    )
}
export default Menu;