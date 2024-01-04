import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from "./pages/Home";
import ChatPage from '../src/pages/ChatPage'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat/:value/:roomName' element={<ChatPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
