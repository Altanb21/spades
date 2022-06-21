import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sections/Sidebar";
import CrashGame from "./Pages/CrashGame";
import CoinFlip from "./Pages/CoinFlip";
import io from "socket.io-client";
import Mines from "./Pages/Mines";

export const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <BrowserRouter>
      <div className='flex'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/crash' element={<CrashGame />} />
          <Route path='/coinflip' element={<CoinFlip />} />
          <Route path='/mines' element={<Mines />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
