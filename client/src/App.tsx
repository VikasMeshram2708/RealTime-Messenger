import { Send } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

function App() {
  const baseURL =
    process.env.NODE_ENV === "production" ? undefined : "http://localhost:8080";

  // Memoize the socket connection so it doesn't recreate on each render
  const socketRef = useRef<Socket | null>(null);
  interface ChatMessage {
    userId: string | undefined;
    text: string;
    timestamp: Date;
  }
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  if (!socketRef.current) {
    socketRef.current = io(baseURL);
  }

  const socket = socketRef.current;

  const [text, setText] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (!text.trim()) return;
    socket.emit("chat", {
      userId: socket.id,
      text: text,
      timestamp: Date.now(),
    });
    setText("");
  };

  useEffect(() => {
    const handleIncomingMessages = (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("chat", handleIncomingMessages);

    return () => {
      socket.off("chat", handleIncomingMessages);
    };
  }, [socket]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/50 to-transparent p-6">
      <div className="w-full max-w-2xl space-y-6">
        <h2 className="text-3xl font-bold text-white text-center">
          {isConnected ? "💬 Real-Time Chat" : "🔄 Connecting..."}
        </h2>
        <Card className="h-[500px] border border-white/10 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader>
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto p-4">
              {messages.map((msg, idx) => {
                const isMe = msg.userId === socket.id;
                const userLocale = navigator.language || "en-US";
                console.log("userLocale", userLocale);
                const time = new Date(
                  msg.timestamp || Date.now()
                ).toLocaleTimeString(userLocale, {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                return (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[75%] ${
                      isMe ? "items-end ml-auto" : "items-start mr-auto"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm shadow-md ${
                        isMe
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white text-gray-900 rounded-bl-none"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    <span
                      className={`mt-1 text-[10px] ${
                        isMe ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {time}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-full p-4 space-y-4">
            {/* Chat messages area (mock for now) */}
            <div className="flex-1 overflow-y-auto bg-white/5 rounded-lg p-3 text-white text-sm space-y-2 custom-scrollbar">
              <p className="bg-white/10 p-2 rounded">👋 Welcome to the chat!</p>
              {/* Future: Map over messages */}
            </div>

            {/* Input area */}
            <div className="flex items-center gap-2">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full px-4 py-2 text-base border"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <Button
                size="icon"
                className="rounded-full p-3"
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5 text-white" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
