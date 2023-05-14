import './styles.css';
import axios from 'axios';
import Chat from '../../types/Chat'
import { useState, useEffect } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BASE_URL, CONFIG } from '../../utils/request'

type MenuProps = 
{
    chatId : number | null
    onSelectChat: (chatId: number | null) => void;
}


const Menu = ( {chatId, onSelectChat} : MenuProps ) =>
{
    const [chats, setChats] = useState<Chat[]>([])
    const [activeChat, setActiveChat] = useState<number | null>(null);

    useEffect(() => 
    {
        axios.get(`${BASE_URL}/chats`, CONFIG)
        .then((response) => { setChats(response.data); })
        .catch((error) => { console.log(error); })
        setActiveChat(chatId);
        
    }, [chatId]);


    const handleChatClick = (chatId : number | null) => {
        onSelectChat(chatId);
      };

    return(

        <nav className="menu-container">

            <button className='new-chat-button' onClick={ () => handleChatClick(null) }>
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                New chat
            </button>

            <ul className='history-container'>
                {
                    chats.map((chat: Chat) => (
                    <li 
                        key={chat.id} 
                        className = {`menu-link ${chat.id === activeChat ? 'active' : ''}`} 
                        onClick={() => handleChatClick(chat.id)}> {chat.title} 
                    </li>))
                }  
            </ul>

            <div className="perfil-container">
                <a className="menu-link" href="#a">Upgrade to Plus</a>
            </div>

        </nav>
    )
}
export default Menu;