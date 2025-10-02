"use client";
import React, { useState, useEffect, useRef } from 'react';
import { User, Network, AlertCircle, Lightbulb, Smartphone, Users, Brain, ChevronDown, Globe, Wifi, MessageCircle, Send, X, Settings, Sparkles, Loader2 } from 'lucide-react';
import dynamic from "next/dynamic";

const SkyBackground = dynamic(() => import("./components/SkyBackground"), {
  ssr: false,
});

export default function BanChatConNguoi() {
  const [activeTab, setActiveTab] = useState('intro');
  const [scrollY, setScrollY] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Xin chào! Tôi là trợ lý Triết học được hỗ trợ bởi AI. Hãy hỏi tôi bất cứ điều gì! 🧠✨' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        - Trả lời NGẮN GỌN: 1-2 câu.
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
          text: 'Xin lỗi, có lỗi xảy ra. Hãy thử lại!' 
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
    <div className="min-h-screen relative overflow-hidden">
      
      {/* 🌌 Nền 3D với GLB */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <SkyBackground />
      </div>

      {/* Lớp phủ gradient nhẹ để text dễ đọc hơn */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none -z-5"></div>

      {/* Header */}
      {/* Header - Thu nhỏ lại */}
      <header 
        className="relative text-white py-12 overflow-hidden backdrop-blur-sm"
        style={{ 
          transform: `translateY(${scrollY * 0.3}px)`,
          background: 'linear-gradient(135deg, rgba(220,38,38,0.3), rgba(239,68,68,0.2), rgba(251,146,60,0.3))'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          {/* Icon nhỏ hơn */}
          <div className="inline-block mb-4 relative">
            <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-40 animate-pulse"></div>
            <Brain className="w-14 h-14 mx-auto text-yellow-300 relative z-10 animate-bounce drop-shadow-2xl" />
          </div>
          
          {/* Title nhỏ hơn */}
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-2xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-orange-200">
              Bản chất con người
            </span>
            <br />
            <span className="text-2xl md:text-3xl text-white/95">trong thời đại số hóa</span>
          </h1>
          
          {/* Subtitle nhỏ hơn */}
          <p className="text-base md:text-lg text-white/90 mb-5 font-light">
            Góc nhìn từ Triết học Mác - Lênin
          </p>

          {/* Tags nhỏ hơn và sát lại */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm">
            {[
              { icon: Users, text: "Quan hệ xã hội", color: "from-blue-500/80 to-cyan-500/80" },
              { icon: Network, text: "Số hóa", color: "from-purple-500/80 to-pink-500/80" },
              { icon: Smartphone, text: "Tha hóa", color: "from-red-500/80 to-orange-500/80" },
              { icon: Globe, text: "Kết nối toàn cầu", color: "from-green-500/80 to-emerald-500/80" }
            ].map((tag, i) => {
              const Icon = tag.icon;
              return (
                <div 
                  key={i}
                  className={`group relative flex items-center bg-gradient-to-r ${tag.color} backdrop-blur-md px-4 py-2 rounded-full transform transition-all duration-300 hover:scale-110 shadow-lg border border-white/20`}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Icon className={`w-4 h-4 mr-2 transition-transform duration-300 ${hoveredCard === i ? 'rotate-180' : ''}`} />
                  <span className="font-semibold text-white">{tag.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Navigation - Sát liền header, không có khoảng trống */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 shadow-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center space-x-2 py-3 flex-wrap gap-2">
            {[
              { id: 'intro', label: 'Đặt vấn đề', icon: AlertCircle, color: 'from-red-500 to-orange-500' },
              { id: 'theory', label: 'Lý thuyết', icon: Lightbulb, color: 'from-yellow-500 to-orange-500' },
              { id: 'reality', label: 'Thực trạng', icon: Network, color: 'from-purple-500 to-pink-500' },
              { id: 'conclusion', label: 'Kết luận', icon: User, color: 'from-green-500 to-emerald-500' }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center px-5 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                      : 'backdrop-blur-sm bg-white/10 text-white hover:bg-white/20 border border-white/30'
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


      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-6 py-6">
        {activeTab === 'intro' && (
          <div className="space-y-6 animate-slide-up">
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl p-10 border border-white/10">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <AlertCircle className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white">Đặt vấn đề</h2>
              </div>
              
              <div className="relative backdrop-blur-md bg-gradient-to-r from-red-500/20 to-orange-500/20 border-l-4 border-red-400 p-8 mb-8 rounded-r-2xl">
                <p className="text-xl text-white leading-relaxed italic mb-4">
                  "Bản chất con người không phải là cái trừu tượng cố hữu của cá nhân riêng biệt, 
                  mà là tổng hòa những mối quan hệ xã hội."
                </p>
                <p className="text-right text-yellow-300 font-bold text-lg">— Karl Marx</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="backdrop-blur-md bg-blue-500/20 p-6 rounded-2xl border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
                  <Smartphone className="w-12 h-12 text-blue-300 mb-3" />
                  <h4 className="text-white font-bold mb-2 text-lg">Giao tiếp qua màn hình</h4>
                  <p className="text-gray-200 text-sm">Nhiều hơn gặp mặt trực tiếp</p>
                </div>
                <div className="backdrop-blur-md bg-purple-500/20 p-6 rounded-2xl border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                  <Users className="w-12 h-12 text-purple-300 mb-3" />
                  <h4 className="text-white font-bold mb-2 text-lg">Lao động từ xa</h4>
                  <p className="text-gray-200 text-sm">Thay thế làm việc tập thể</p>
                </div>
                <div className="backdrop-blur-md bg-pink-500/20 p-6 rounded-2xl border border-pink-400/30 hover:border-pink-400/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20">
                  <Network className="w-12 h-12 text-pink-300 mb-3" />
                  <h4 className="text-white font-bold mb-2 text-lg">Phiên bản số</h4>
                  <p className="text-gray-200 text-sm">Bản thân trên không gian mạng</p>
                </div>
              </div>

              <div className="backdrop-blur-md bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/40 rounded-2xl p-8">
                <h3 className="text-3xl font-bold text-yellow-300 mb-6">❓ Câu hỏi nghiên cứu</h3>
                <div className="space-y-4 text-white text-lg">
                  <p>• Nếu các quan hệ xã hội là nền tảng hình thành bản chất con người mà giờ đây chúng ngày càng <span className="text-yellow-300 font-semibold">ảo hóa, phi vật chất hóa</span>...</p>
                  <p>• Thì <span className="text-yellow-300 font-semibold">bản chất con người</span> có đang bị biến đổi tận gốc rễ?</p>
                  <p>• Liệu con người có <span className="text-yellow-300 font-semibold">nguy cơ đánh mất</span> chính bản chất của mình?</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'theory' && (
          <div className="space-y-6 animate-slide-up">
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl p-10 border border-white/10">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white">Quan điểm Triết học Mác - Lênin</h2>
              </div>

              <div className="space-y-6">
                <div className="backdrop-blur-md bg-blue-500/15 p-8 rounded-2xl border border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/20 transition-all">
                  <h3 className="text-3xl font-bold text-blue-300 mb-5">1. Con người và bản chất con người</h3>
                  <div className="space-y-4 ml-6 text-lg">
                    <p className="text-white">• <strong className="text-blue-200">Bản chất lịch sử - xã hội:</strong> Không cố định, được hình thành qua lịch sử</p>
                    <p className="text-white">• <strong className="text-blue-200">Tổng hòa các mối quan hệ xã hội:</strong> Qua quan hệ kinh tế, chính trị, văn hóa...</p>
                    <p className="text-white">• <strong className="text-blue-200">Thực tiễn lao động:</strong> Hoạt động cơ bản tạo nên con người</p>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-red-500/15 p-8 rounded-2xl border border-red-400/30 hover:shadow-xl hover:shadow-red-500/20 transition-all">
                  <h3 className="text-3xl font-bold text-red-300 mb-5">2. Hiện tượng tha hóa con người</h3>
                  <div className="space-y-4 ml-6 text-lg">
                    <p className="text-white">• <strong className="text-red-200">Khái niệm:</strong> Sản phẩm lao động trở thành xa lạ với con người</p>
                    <p className="text-white">• <strong className="text-red-200">Nguyên nhân:</strong> Chế độ tư hữu, phân công lao động bất hợp lý</p>
                    <p className="text-white">• <strong className="text-red-200">Biểu hiện:</strong> Con người bị chi phối bởi sản phẩm mình tạo ra</p>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-green-500/15 p-8 rounded-2xl border border-green-400/30 hover:shadow-xl hover:shadow-green-500/20 transition-all">
                  <h3 className="text-3xl font-bold text-green-300 mb-5">3. Giải phóng con người</h3>
                  <div className="space-y-4 ml-6 text-lg">
                    <p className="text-white">• <strong className="text-green-200">Mục tiêu:</strong> Giải phóng khỏi áp bức, bóc lột</p>
                    <p className="text-white">• <strong className="text-green-200">Con đường:</strong> Cách mạng xã hội, xây dựng CNXH</p>
                    <p className="text-white">• <strong className="text-green-200">Ý nghĩa:</strong> Phát triển toàn diện, tự do sáng tạo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz */}
            <div className="backdrop-blur-md bg-purple-500/20 rounded-3xl p-10 border border-purple-400/40">
              <h3 className="text-3xl font-bold text-white mb-6">🧠 Kiểm tra kiến thức</h3>
              <p className="text-white text-xl mb-6">{quizQuestion.question}</p>
              <div className="space-y-4">
                {quizQuestion.options.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setQuizAnswer(option.id)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all text-lg ${
                      quizAnswer === option.id
                        ? option.correct
                          ? 'bg-green-500/30 border-green-400 shadow-lg shadow-green-500/30'
                          : 'bg-red-500/30 border-red-400 shadow-lg shadow-red-500/30'
                        : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                    }`}
                  >
                    <span className="font-bold mr-3 text-white">{option.id.toUpperCase()}.</span>
                    <span className="text-white">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reality' && (
          <div className="space-y-6 animate-slide-up">
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl p-10 border border-white/10">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Network className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white">Phân tích theo Triết học Mác - Lênin</h2>
              </div>

              <div className="space-y-6">
                <div className="backdrop-blur-md bg-green-500/15 rounded-2xl p-8 border-l-4 border-green-400 hover:shadow-xl hover:shadow-green-500/20 transition-all">
                  <h4 className="font-bold text-2xl text-green-300 mb-4">✅ 1. Bản chất con người CÓ thay đổi nhưng KHÔNG mất đi</h4>
                  <p className="text-white text-lg leading-relaxed">
                    Bản chất con người vẫn là "tổng hòa các mối quan hệ xã hội", chỉ là các mối quan hệ này có hình thức mới trong thời đại số.
                  </p>
                </div>

                <div className="backdrop-blur-md bg-orange-500/15 rounded-2xl p-8 border-l-4 border-orange-400 hover:shadow-xl hover:shadow-orange-500/20 transition-all">
                  <h4 className="font-bold text-2xl text-orange-300 mb-4">⚠️ 2. Nguy cơ tha hóa mới trong thời đại số</h4>
                  <p className="text-white text-lg leading-relaxed">
                    Con người bị chi phối bởi thuật toán, mạng xã hội - tương tự như bị chi phối bởi máy móc trong thời đại công nghiệp.
                  </p>
                </div>

                <div className="backdrop-blur-md bg-purple-500/15 rounded-2xl p-8 border-l-4 border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 transition-all">
                  <h4 className="font-bold text-2xl text-purple-300 mb-4">💪 3. Con người vẫn là "chủ thể" của lịch sử</h4>
                  <p className="text-white text-lg leading-relaxed">
                    Công nghệ do con người tạo ra, nên con người có khả năng định hướng, kiểm soát nó.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'conclusion' && (
          <div className="space-y-6 animate-slide-up">
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl p-10 border border-white/10">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <User className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white">Kết luận</h2>
              </div>

              <div className="space-y-6">
                <div className="backdrop-blur-md bg-green-500/15 border-l-4 border-green-400 p-10 rounded-r-2xl">
                  <h3 className="font-bold text-3xl text-green-300 mb-6">✅ Trả lời câu hỏi nghiên cứu</h3>
                  <div className="space-y-5">
                    <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-xl border border-green-400/30">
                      <p className="text-green-200 font-bold mb-3 text-xl">1. Bản chất con người có bị biến đổi tận gốc rễ?</p>
                      <p className="text-white text-lg">→ KHÔNG. Bản chất vẫn là "tổng hòa các mối quan hệ xã hội", chỉ là hình thức mới.</p>
                    </div>
                    <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-xl border border-green-400/30">
                      <p className="text-green-200 font-bold mb-3 text-xl">2. Con người có nguy cơ đánh mất bản chất?</p>
                      <p className="text-white text-lg">→ CÓ nguy cơ tha hóa mới, nhưng KHÔNG đánh mất hoàn toàn nếu có hành động đúng đắn.</p>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl p-10 border border-orange-400/40">
                  <h3 className="font-bold text-3xl text-yellow-300 mb-6">🎯 Thông điệp</h3>
                  <p className="text-white leading-relaxed italic text-xl">
                    "Công nghệ số là công cụ, không phải mục đích. Con người phải là trung tâm, 
                    là chủ thể của mọi sự phát triển. Chúng ta cần ứng dụng triết học Mác - Lênin 
                    để định hướng công nghệ phục vụ con người, thay vì để con người trở thành nô lệ của công nghệ."
                  </p>
                </div>
              </div>
            </div>

            <div className="relative backdrop-blur-md bg-gradient-to-r from-red-500/30 via-orange-500/30 to-yellow-500/30 rounded-2xl p-6 text-center overflow-hidden shadow-xl border border-white/20 max-w-2xl mx-auto">             
               <div className="relative">  
                <div className="text-4xl mb-3 animate-bounce">🎓</div>
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
                  Cảm ơn mọi người đã theo dõi!
                </h3>
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

      {/* Chatbot Window - GIỮ NGUYÊN CODE CỦA BẠN */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] backdrop-blur-xl bg-gray-900/90 rounded-2xl shadow-2xl border border-purple-500/50 flex flex-col overflow-hidden animate-slide-up">
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
        
          </div>

          {/* API Key Input */}
          {showApiInput && (
            <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 p-4 space-y-3">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">API Key (OpenRouter)</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-or-v1-..."
                  className="w-full bg-gray-700/80 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                />
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                      : 'backdrop-blur-md bg-white/10 text-gray-100 border border-white/20'
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
            <div className="backdrop-blur-md bg-gray-800/80 border-t border-gray-700/50 p-3 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputMessage(q)}
                    className="flex-shrink-0 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-gray-300 text-xs px-3 py-2 rounded-lg border border-white/20 transition-colors whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="backdrop-blur-md bg-gray-800/90 border-t border-gray-700/50 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Hỏi về triết học..."
                disabled={isLoading}
                className="flex-1 backdrop-blur-sm bg-white/10 text-white px-4 py-3 rounded-xl border border-white/20 focus:border-purple-500 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
