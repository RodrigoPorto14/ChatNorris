import Chat from './pages/Chat';
import Auth from './pages/Auth';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";

const Routing = () => {

  const userAuthenticated = isAuthenticated();

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