import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

class Message {
  text: string;
  isUser: boolean;

  constructor(text: string, isUser: boolean) {
    this.text = text;
    this.isUser = isUser;
  }
}

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      const newMessage = new Message(trimmedMessage, true);
      setMessage('');

      fetch('https://api.chucknorris.io/jokes/random')
        .then((response) => response.json())
        .then((data) => {
          const botMessage = new Message(data.value, false);
          setMessages([...messages, newMessage, botMessage]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleKeyDown = (event: { key: string; preventDefault: () => void }) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <section className="chat-container">
      <div className="chatbot-container">
        <div className="navbar">
          <a href="#">ChatNorris</a>
        </div>
        <div className="message-container" ref={messageContainerRef}>
          {messages.map((msg: Message, i) => (
            <div key={i} className={`message ${msg.isUser ? 'user' : 'bot'}`}> {msg.text} </div>  ))}
        </div>
        <div className="dialog">
          <input type="text" placeholder="Digite sua mensagem..." value={message} onChange={handleInputChange}
            onKeyDown={handleKeyDown}/>
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
