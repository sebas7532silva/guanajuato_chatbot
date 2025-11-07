import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Chatbot = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 ¡Hola! Soy tu asistente de Trámites Vehiculares de Guanajuato. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      // 🔹 Llamada a tu backend o API del ChatGPT
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      console.log(input);

      const data = await response.json();
      const reply = data.reply || "Lo siento, no entendí tu consulta 😅.";

      setMessages([...newMessages, { sender: "bot", text: reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Error al conectar con el asistente." },
      ]);
    }
  };

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <button
        onClick={onToggle}
        className="btn btn-primary rounded-circle shadow position-fixed"
        style={{
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          backgroundColor: "#3683f8ff",
          border: "none",
          zIndex: 1050,
        }}
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

      {/* VENTANA DEL CHAT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.3 }}
            className="card shadow-lg position-fixed"
            style={{
              bottom: "90px",
              right: "20px",
              width: "380px",
              height: "600px", // ⬆️ más alta que antes
              borderRadius: "18px",
              overflow: "hidden",
              zIndex: 1050,
            }}
          >
            {/* ENCABEZADO */}
            <div
              className="card-header text-white fw-semibold d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#004dc1" }}
            >
              <span><i className="bi bi-chat-dots me-2"></i> Asistente de Trámites</span>
              <button
                onClick={onToggle}
                className="btn btn-sm btn-outline-light border-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* MENSAJES */}
            <div
              className="card-body"
              style={{
                maxHeight: "500px",
                overflowY: "auto",
                backgroundColor: "#f9fafc",
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex mb-2 ${
                    msg.sender === "user"
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-3 ${
                      msg.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-light border"
                    }`}
                    style={{
                      maxWidth: "75%",
                      fontSize: "0.9rem",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="card-footer p-2 d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="btn btn-primary"
                style={{ backgroundColor: "#004dc1", border: "none" }}
                onClick={handleSend}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
