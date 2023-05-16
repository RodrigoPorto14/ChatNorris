import './styles.css';
import axios from 'axios';
import Message from '../../types/Message'
import React, { useState, useRef, useEffect } from 'react';
import { BASE_URL, CONFIG } from '../../utils/request'

type ChatDetailsProps =
{
    chatId : number | null
    setChatId : (value:  any) => void
}

const ChatDetails = ( {chatId, setChatId} : ChatDetailsProps ) => 
{
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  /****************************************************************** 
   A cada mudança do estado "chatId", é feita uma requisição das
   mensagens da conversa com id = "chatId", mudando o estado
   de "messages" para a lista de mensagens recebida pela requisição.
   Em caso de "chatId" = null, o estado "messages" é atualizado
   para uma lista vazia.
  ******************************************************************/
  useEffect(() => 
  {
    if(chatId !== null)
    {
      axios.get(`${BASE_URL}/messages/${chatId}`, CONFIG)
           .then((response) => { setMessages(response.data); })
           .catch((error) => { console.log(error); })
    }
    else 
      setMessages([])
    
  }, [chatId]);


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
  const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => 
  {
    setInputText(event.target.value);
  };


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
   do input para vazio e caso estado "chatId" = null, é criado uma
   nova conversa no banco de dados com a mensagem enviada, caso
   contrário, apenas cria as mensagens na conversa selecionada
  ******************************************************************/
  const handleSendMessage = () => 
  {
    const trimmedMessage = inputText.trim();
    if (trimmedMessage) 
    {
        setInputText('');

        if(chatId === null)
            createNewChat(trimmedMessage);
        else
            createMessages(trimmedMessage);
    }
  };


  /****************************************************************** 
   Insere uma nova conversa no banco de dados, modifica o estado de
   "chatId" para o id dessa nova conversa e depois chama a função
   createMessages para inserir as mensagens nessa conversa
  ******************************************************************/
  function createNewChat(msg : string)
  {
    const title = msg.slice(0,20);
    const body = { title }

    axios.post(`${BASE_URL}/chats`, body, CONFIG)
         .then((response) => 
         { 
            chatId = response.data.id
            setChatId(chatId)
            createMessages(msg)
         })
         .catch((error) => { console.log(error); })
  }

  /****************************************************************** 
   Chama a função createNewMessages para criar uma nova mensagem no
   banco de dados com a mensagem enviada pelo usuario e depois
   requisita a mensagem do bot e chama a mesma função para
   criar a mensagem do bot no banco.
  ******************************************************************/
  function createMessages(msg : string)
  {
    createNewMessage( {text : msg, user : true, chatId});

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
  function createNewMessage(body : {text : string, user : boolean, chatId : number | null} )
  {
    axios.post(`${BASE_URL}/messages`, body, CONFIG)
         .then((response) => 
         { 
            const msg = response.data
            setMessages((messages) => [...messages, {id: msg.id, text: msg.text, user: msg.user}])
         })
         .catch((error) => { console.log(error); })
  }

  return (
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
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
        
      </section>
  );
};

export default ChatDetails;
