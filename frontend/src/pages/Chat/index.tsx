import {useState} from 'react'
import './styles.css';
import Menu from '../../components/Menu'
import ChatDetails from '../../components/ChatDetails'

const Chat = () =>
{

    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

    function handleSelectChat(chatId: number | null) 
    {
        setSelectedChatId(chatId);
    }

    return(

        <div className="chat-page-container">

            <Menu  chatId={selectedChatId} onSelectChat={handleSelectChat} />
            <ChatDetails chatId={selectedChatId} setChatId = {setSelectedChatId} />

        </div>
    );
}

export default Chat