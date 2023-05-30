import Chat from './pages/Chat';
import Auth from './pages/Auth';
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";

const Routing = () => {

  //const [loading, setLoading] = useState(true)
  //const [userAuthenticated, setUserAuthenticated] = useState(false)
  const userAuthenticated = isAuthenticated();
  /*useEffect(() =>
  {
    setUserAuthenticated(isAuthenticated());
    setLoading(false)

  },[])
  

  if(loading)
        return <p>loading</p>*/

  return (
    <BrowserRouter>
      <Routes>
        {userAuthenticated ? 
        (
          <>
            <Route index element={<Chat />} />
            <Route path="chats/:selectedChatId" element={<Chat />} />
          </>
        ) : 
        (
          <Route path="/auth" element={<Auth />} />
        )}
        
        <Route path="*" element={<Navigate to={userAuthenticated ? '/' : '/auth'} replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Routing;