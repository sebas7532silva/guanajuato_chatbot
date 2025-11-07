
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TramiteDetalle from './TramiteDetalle';
import Chatbot from './Chatbot';
import { useState } from 'react';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen((prev) => !prev);
  return (
    <>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home onChatOpen={toggleChat} />} />
          <Route
          path="/tramite/:tramiteId"
          element={<TramiteDetalle />}
          />
        </Routes>
        <Chatbot isOpen={isChatOpen} onToggle={toggleChat} />
        <Footer />
        
      </Router>

    </>
  )
}

export default App


