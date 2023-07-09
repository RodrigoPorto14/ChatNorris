import Chat from './pages/Chat';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";

const Routing = () => {

  const userAuthenticated = isAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        {
          userAuthenticated ? 
          (
            <>
              <Route index element={<Chat />} />
              <Route path="chats/:selectedChatId" element={<Chat />} />
            </>
          ) 
          : 
          (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )
        }
        
        <Route path="*" element={<Navigate to={userAuthenticated ? '/' : '/login'} replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Routing;