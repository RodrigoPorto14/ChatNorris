import Chat from './pages/Chat';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => 
{
    return(

        <BrowserRouter>
            <Routes>
                <Route index element={<Chat />} />
            </Routes>  
        </BrowserRouter>
        
    )
}

export default App;
