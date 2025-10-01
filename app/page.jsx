"use client";
import React, { useState, useEffect, useRef } from 'react';
import { User, Network, AlertCircle, Lightbulb, Smartphone, Users, Brain, ChevronDown, Globe, Wifi, MessageCircle, Send, X, Settings, Sparkles, Loader2 } from 'lucide-react';

export default function BanChatConNguoi() {
  const [activeTab, setActiveTab] = useState('intro');
  const [scrollY, setScrollY] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const EMBEDDED_API_KEY = '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';
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Xin chào! Tôi là trợ lý Triết học được hỗ trợ bởi AI. Hãy hỏi tôi bất cứ điều gì! 🧠✨' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const chatEndRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
        ctx.fill();
        
        nodes.slice(i + 1).forEach(other => {
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }, []);

  const quizQuestion = {
    question: "Theo Marx, bản chất con người là gì?",
    options: [
      { id: 'a', text: "Cái trừu tượng cố hữu từ khi sinh ra", correct: false },
      { id: 'b', text: "Tổng hòa các mối quan hệ xã hội", correct: true },
      { id: 'c', text: "Bản năng sinh học tự nhiên", correct: false },
      { id: 'd', text: "Lý trí và tri thức cá nhân", correct: false }
    ]
  };

  const quickQuestions = [
    'Triết học Mác-Lênin là gì?',
    'Bản chất con người là gì?',
    'Bản chất con người theo các triết gia',
  ];

  const callAI = async (userMessage) => {
    try {
      const systemPrompt = `
        Bạn là một trợ lý TRIẾT HỌC chuyên sâu (Tiếng Việt).
        - Chỉ trả lời các câu hỏi liên quan tới triết học.
        - Nếu câu hỏi không liên quan, trả lời: "Tôi chỉ trả lời về triết học."
        - Trả lời NGẮN GỌN: 1–2 câu.
      `;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, systemPrompt }),
      });

      if (!response.ok) throw new Error("API nội bộ lỗi");

      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() || "Không có phản hồi.";
    } catch (err) {
      return `❌ ${err.message}`;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    const reply = await callAI(input);
    setMessages((prev) => [...prev, { role: "bot", text: reply }]);
  };



  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = { role: 'user', text: inputMessage };
    setChatMessages(prev => [...prev, userMsg]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    setChatMessages(prev => [...prev, { role: 'bot', text: '🤔 Đang suy nghĩ...', isTyping: true }]);

    try {
      const aiResponse = await callAI(currentInput);
      
      setChatMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        return [...withoutTyping, { role: 'bot', text: aiResponse }];
      });
    } catch (error) {
      setChatMessages(prev => {
        const withoutTyping = prev.filter(msg => !msg.isTyping);
        return [...withoutTyping, { 
          role: 'bot', 
          text: 'Xin lỗi, có lỗi xảy ra. Hãy kiểm tra API key và thử lại! 🙏' 
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  

  useEffect(() => {
    if (chatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 relative overflow-hidden">
      
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
      />

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: `radial-gradient(circle, rgba(239, 68, 68, ${Math.random() * 0.5 + 0.3}), transparent)`,
              animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <header 
        className="relative bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-20 shadow-2xl overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {[...Array(64)].map((_, i) => (
              <div 
                key={i} 
                className="border border-white/20 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 animate-pulse"></div>
            <Brain className="w-20 h-20 mx-auto text-yellow-300 relative z-10 animate-bounce" />
          </div>
          
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-red-300 to-pink-300">
              Bản chất con người
            </span>
            <br />
            <span className="text-4xl">trong thời đại số hóa</span>
          </h1>
          
          <p className="text-2xl text-red-100 mb-8">
            Góc nhìn từ Triết học Mác - Lênin
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm mb-8">
            {[
              { icon: Users, text: "Quan hệ xã hội", color: "from-blue-500 to-cyan-500" },
              { icon: Network, text: "Số hóa", color: "from-purple-500 to-pink-500" },
              { icon: Smartphone, text: "Tha hóa", color: "from-red-500 to-orange-500" },
              { icon: Globe, text: "Kết nối toàn cầu", color: "from-green-500 to-emerald-500" }
            ].map((tag, i) => {
              const Icon = tag.icon;
              return (
                <div 
                  key={i}
                  className={`group relative flex items-center bg-gradient-to-r ${tag.color} px-6 py-3 rounded-full backdrop-blur-sm transform transition-all duration-300 hover:scale-110 hover:-translate-y-2`}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Icon className={`w-5 h-5 mr-2 transition-transform ${hoveredCard === i ? 'rotate-180' : ''}`} />
                  <span className="font-semibold">{tag.text}</span>
                </div>
              );
            })}
          </div>
          
          <ChevronDown className="w-10 h-10 mx-auto mt-8 animate-bounce text-yellow-300" />
        </div>
      </header>

      <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-red-800/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center space-x-3 py-4 flex-wrap gap-2">
            {[
              { id: 'intro', label: 'Đặt vấn đề', icon: AlertCircle, color: 'from-red-600 to-orange-600' },
              { id: 'theory', label: 'Lý thuyết', icon: Lightbulb, color: 'from-yellow-600 to-orange-600' },
              { id: 'reality', label: 'Thực trạng', icon: Network, color: 'from-purple-600 to-pink-600' },
              { id: 'conclusion', label: 'Kết luận', icon: User, color: 'from-green-600 to-emerald-600' }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="relative max-w-6xl mx-auto px-6 py-12">
        {activeTab === 'intro' && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-red-800/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Đặt vấn đề</h2>
              </div>
              
              <div className="relative bg-gradient-to-r from-red-900/40 to-orange-900/40 border-l-4 border-red-500 p-8 mb-8 rounded-r-xl">
                <p className="text-lg text-gray-100 leading-relaxed italic mb-4">
                  "Bản chất con người không phải là cái trừu tượng cố hữu của cá nhân riêng biệt, 
                  mà là tổng hòa những mối quan hệ xã hội."
                </p>
                <p className="text-right text-yellow-300 font-bold">— Karl Marx</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                  <Smartphone className="w-10 h-10 text-blue-400 mb-3" />
                  <h4 className="text-white font-bold mb-2">Giao tiếp qua màn hình</h4>
                  <p className="text-gray-300 text-sm">Nhiều hơn gặp mặt trực tiếp</p>
                </div>
                <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                  <Users className="w-10 h-10 text-purple-400 mb-3" />
                  <h4 className="text-white font-bold mb-2">Lao động từ xa</h4>
                  <p className="text-gray-300 text-sm">Thay thế làm việc tập thể</p>
                </div>
                <div className="bg-pink-900/30 p-6 rounded-xl border border-pink-700/30 hover:border-pink-500/50 transition-all duration-300 hover:scale-105">
                  <Network className="w-10 h-10 text-pink-400 mb-3" />
                  <h4 className="text-white font-bold mb-2">Phiên bản số</h4>
                  <p className="text-gray-300 text-sm">Bản thân trên không gian mạng</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border border-yellow-700/50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">❓ Câu hỏi nghiên cứu</h3>
                <div className="space-y-3 text-yellow-100">
                  <p>• Nếu các quan hệ xã hội là nền tảng hình thành bản chất con người mà giờ đây chúng ngày càng ảo hóa, phi vật chất hóa...</p>
                  <p>• Thì bản chất con người có đang bị biến đổi tận gốc rễ?</p>
                  <p>• Liệu con người có nguy cơ đánh mất chính bản chất của mình?</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'theory' && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-red-800/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Quan điểm Triết học Mác - Lênin</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 p-6 rounded-xl border border-blue-700/30">
                  <h3 className="text-2xl font-bold text-blue-300 mb-4">1. Con người và bản chất con người</h3>
                  <div className="space-y-3 ml-4">
                    <p className="text-gray-200">• <strong>Bản chất lịch sử - xã hội:</strong> Không cố định, được hình thành qua lịch sử</p>
                    <p className="text-gray-200">• <strong>Tổng hòa các mối quan hệ xã hội:</strong> Qua quan hệ kinh tế, chính trị, văn hóa...</p>
                    <p className="text-gray-200">• <strong>Thực tiễn lao động:</strong> Hoạt động cơ bản tạo nên con người</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 p-6 rounded-xl border border-red-700/30">
                  <h3 className="text-2xl font-bold text-red-300 mb-4">2. Hiện tượng tha hóa con người</h3>
                  <div className="space-y-3 ml-4">
                    <p className="text-gray-200">• <strong>Khái niệm:</strong> Sản phẩm lao động trở thành xa lạ với con người</p>
                    <p className="text-gray-200">• <strong>Nguyên nhân:</strong> Chế độ tư hữu, phân công lao động bất hợp lý</p>
                    <p className="text-gray-200">• <strong>Biểu hiện:</strong> Con người bị chi phối bởi sản phẩm mình tạo ra</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 p-6 rounded-xl border border-green-700/30">
                  <h3 className="text-2xl font-bold text-green-300 mb-4">3. Giải phóng con người</h3>
                  <div className="space-y-3 ml-4">
                    <p className="text-gray-200">• <strong>Mục tiêu:</strong> Giải phóng khỏi áp bức, bóc lột</p>
                    <p className="text-gray-200">• <strong>Con đường:</strong> Cách mạng xã hội, xây dựng CNXH</p>
                    <p className="text-gray-200">• <strong>Ý nghĩa:</strong> Phát triển toàn diện, tự do sáng tạo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-8 border border-purple-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">🧠 Kiểm tra kiến thức</h3>
              <p className="text-gray-200 mb-6">{quizQuestion.question}</p>
              <div className="space-y-3">
                {quizQuestion.options.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setQuizAnswer(option.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      quizAnswer === option.id
                        ? option.correct
                          ? 'bg-green-600 border-green-400'
                          : 'bg-red-600 border-red-400'
                        : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="font-bold mr-3">{option.id.toUpperCase()}.</span>
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reality' && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-red-800/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Phân tích theo Triết học Mác - Lênin</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-6 border-l-4 border-green-500">
                  <h4 className="font-bold text-xl text-green-300 mb-3">✅ 1. Bản chất con người CÓ thay đổi nhưng KHÔNG mất đi</h4>
                  <p className="text-gray-200">
                    Bản chất con người vẫn là "tổng hòa các mối quan hệ xã hội", chỉ là các mối quan hệ này có hình thức mới trong thời đại số.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-xl p-6 border-l-4 border-orange-500">
                  <h4 className="font-bold text-xl text-orange-300 mb-3">⚠️ 2. Nguy cơ tha hóa mới trong thời đại số</h4>
                  <p className="text-gray-200">
                    Con người bị chi phối bởi thuật toán, mạng xã hội - tương tự như bị chi phối bởi máy móc trong thời đại công nghiệp.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-6 border-l-4 border-purple-500">
                  <h4 className="font-bold text-xl text-purple-300 mb-3">💪 3. Con người vẫn là "chủ thể" của lịch sử</h4>
                  <p className="text-gray-200">
                    Công nghệ do con người tạo ra, nên con người có khả năng định hướng, kiểm soát nó.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'conclusion' && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-red-800/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Kết luận</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-l-4 border-green-500 p-8 rounded-r-xl">
                  <h3 className="font-bold text-2xl text-green-300 mb-6">✅ Trả lời câu hỏi nghiên cứu</h3>
                  <div className="space-y-4">
                    <div className="bg-green-950/50 p-6 rounded-xl">
                      <p className="text-green-200 font-bold mb-2">1. Bản chất con người có bị biến đổi tận gốc rễ?</p>
                      <p className="text-gray-300">→ KHÔNG. Bản chất vẫn là "tổng hòa các mối quan hệ xã hội", chỉ là hình thức mới.</p>
                    </div>
                    <div className="bg-green-950/50 p-6 rounded-xl">
                      <p className="text-green-200 font-bold mb-2">2. Con người có nguy cơ đánh mất bản chất?</p>
                      <p className="text-gray-300">→ CÓ nguy cơ tha hóa mới, nhưng KHÔNG đánh mất hoàn toàn nếu có hành động đúng đắn.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 rounded-xl p-8 border border-red-700/50">
                  <h3 className="font-bold text-2xl text-yellow-300 mb-4">🎯 Thông điệp</h3>
                  <p className="text-gray-100 leading-relaxed italic text-lg">
                    "Công nghệ số là công cụ, không phải mục đích. Con người phải là trung tâm, 
                    là chủ thể của mọi sự phát triển. Chúng ta cần ứng dụng triết học Mác - Lênin 
                    để định hướng công nghệ phục vụ con người, thay vì để con người trở thành nô lệ của công nghệ."
                  </p>
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-2xl p-12 text-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative">
                <div className="text-6xl mb-4 animate-bounce">🎓</div>
                <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
                  Cảm ơn cô đã theo dõi!
                </h3>
                <p className="text-xl text-red-100">
                  Đề tài: Bản chất con người trong thời đại số hóa
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Chatbot Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
      >
        {chatOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <>
            <MessageCircle className="w-8 h-8 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </>
        )}
        <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
      </button>

      {/* Chatbot Window */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-gray-900 rounded-2xl shadow-2xl border border-purple-700/50 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <Brain className="w-8 h-8 text-white" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-purple-600"></div>
              </div>
              <div className="ml-3">
                <h3 className="text-white font-bold">Trợ lý Triết học AI</h3>
              </div>
            </div>
            <button
              onClick={() => setShowApiInput(!showApiInput)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              
            </button>
          </div>

          {/* API Key Input */}
          {showApiInput && (
            <div className="bg-gray-800 border-b border-gray-700 p-4 space-y-3">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">API Key (OpenRouter)</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-or-v1-..."
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={saveApiKey}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Lưu
                </button>
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors text-center"
                >
                  Lấy API Key
                </a>
              </div>
              <p className="text-gray-400 text-xs">💡 OpenRouter miễn phí với Llama 3.1</p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}
                >
                  {msg.isTyping ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{msg.text}</span>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Questions */}
          {chatMessages.length <= 2 && (
            <div className="bg-gray-900 border-t border-gray-800 p-3 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputMessage(q)}
                    className="flex-shrink-0 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-3 py-2 rounded-lg border border-gray-700 transition-colors whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="bg-gray-900 border-t border-gray-800 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Hỏi về triết học..."
                disabled={isLoading}
                className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:border-purple-500 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
