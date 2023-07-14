import './styles.css';
import axios from 'axios';
import Message from '../../types/Message'
import Conversation from '../../types/Conversation'
import React, { useState, useRef, useEffect } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams, useNavigate } from 'react-router-dom'

import { makePrivateRequest } from '../../utils/request'
import Menu from '../../components/Menu'

const Chat = () =>
{
    
  const { selectedChatId } = useParams();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Conversation[]>([])
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  /****************************************************************** 
   A cada mudança do parâmetro "selectedChatId", é feita uma requisição 
   das mensagens da conversa com id = "selectedChatId", mudando o estado
   de "messages" para a lista de mensagens recebida pela requisição.
   Em caso de "selectedChatId" = undefined, o estado "messages" é atualizado
   para uma lista vazia.
  ******************************************************************/
  useEffect(() => 
  {
    if(selectedChatId)
    {
        makePrivateRequest({ url: `/messages/${selectedChatId}`})
           .then((response) => { setMessages(response.data); })
           .catch((error) => { console.log(error); })
    }
    else 
      setMessages([])
    
  }, [selectedChatId]);


   /****************************************************************** 
   A cada mudança no estado "messages" é feito uma rolagem automática
   na barra de rolagem da conversa até o final
  ******************************************************************/
  useEffect(() => 
  {
    if (messageContainerRef.current) 
    {
        messageContainerRef.current.scrollTo(
        {
            top: messageContainerRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }
  }, [messages]);


  /****************************************************************** 
   Atualiza o estado de "inputText" para o atual texto do input
   cada vez que esse texto é alterado
  ******************************************************************/
  const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => setInputText(event.target.value);

  /****************************************************************** 
   Chama a função de envio de mensagem também quando é apertado
   a tecla "Enter"
  ******************************************************************/
  const handleKeyDown = (event: { key: string; preventDefault: () => void }) => 
  {
    if (event.key === 'Enter') 
    {
      event.preventDefault();
      handleSendMessage();
    }
  };

  /****************************************************************** 
   Em caso de envio de uma mensagem não vazia, é atualizado o texto
   do input para vazio e caso o parâmetro "selectedChatId" = undefined, 
   é criado uma nova conversa no banco de dados com a mensagem enviada,
   caso contrário, apenas cria as mensagens na conversa selecionada
  ******************************************************************/
  const handleSendMessage = () => 
  {
    const trimmedMessage = inputText.trim();
    if (trimmedMessage) 
    {
        setInputText('');

        if(selectedChatId)
          createMessages(trimmedMessage,parseInt(selectedChatId));
        else
          createNewChat(trimmedMessage);
    }
  };


  /****************************************************************** 
   Insere uma nova conversa no banco de dados, atualiza o estado de
   "chats" com a nova conversa inserida, chama a função createMessages
   para inserir as mensagens nessa conversa e redireciona para a
   rota dessa conversa
  ******************************************************************/
  const createNewChat = (msg : string) =>
  {
    const title = msg.slice(0,20);
    const body = { title }

    makePrivateRequest({ url: '/chats', data: body, method: 'POST' })
         .then((response) => 
         { 
            setChats([response.data, ...chats])
            createMessages(msg,response.data.id)
            navigate(`/chats/${response.data.id}`)
            
         })
         .catch((error) => { console.log(error); })
  }

  /****************************************************************** 
   Chama a função createNewMessage para inserir uma nova mensagem no
   banco de dados com a mensagem enviada pelo usuario e depois
   requisita a mensagem do bot e chama a mesma função para
   inserir a mensagem do bot no banco.
  ******************************************************************/
  const createMessages = (msg : string, chatId : number) =>
  {
    createNewMessage( {text : msg, user : true, chatId} );

    axios.get('https://api.chucknorris.io/jokes/random')
         .then((response) => 
         {
            createNewMessage( {text : response.data.value, user : false, chatId} )
         }) 
         .catch((error) => { console.log(error); })
  }

  /****************************************************************** 
   Insere uma mensagem passada no campo "body" no banco de dados
   e depois atualiza o estado de "messages" com essa mensagem
   inserida.
  ******************************************************************/
  const createNewMessage = (body : {text : string, user : boolean, chatId : number | null} ) =>
  {
    makePrivateRequest({ url: '/messages', data: body, method: 'POST' })
         .then((response) => 
         { 
            const msg = response.data
            setMessages((messages) => [...messages, {id: msg.id, text: msg.text, user: msg.user}])
         })
         .catch((error) => { console.log(error); })
  }

  return (

        <div className="chat-page-container">
            
            <Menu  selectedChatId={selectedChatId} chats={chats} setChats={setChats} />

            <section className="chatbot-container">

                <div className="title">
                    <h1>ChatNorris</h1>
                </div>

                <div className="message-container" ref={messageContainerRef}>
                {
                    messages.map((msg: Message) => ( <div key={msg.id} className={`message ${msg.user ? 'user' : 'bot'}`}> {msg.text} </div>  ))
                }
                </div>

                <div className="dialog">
    
                    <input type="text" placeholder="Digite sua mensagem..." value={inputText} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                    
                </div>
        
            </section>

        </div>
      
  );
}

export default Chat