import React, { useState, useEffect } from 'react';
import { User, Network, AlertCircle, Lightbulb, Smartphone, Users, Brain, Link, ChevronDown } from 'lucide-react';

export default function BanChatConNguoi() {
  const [activeTab, setActiveTab] = useState('intro');
  const [scrollY, setScrollY] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Header with parallax effect */}
      <header 
        className="relative bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-16 shadow-2xl overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block mb-4 animate-bounce">
            <Brain className="w-16 h-16 mx-auto text-yellow-300" />
          </div>
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Bản chất con người trong thời đại số hóa
          </h1>
          <p className="text-xl text-red-100 mb-6">
            Góc nhìn từ Triết học Mác - Lênin
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Users className="w-4 h-4 mr-2" />
              <span>Quan hệ xã hội</span>
            </div>
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Network className="w-4 h-4 mr-2" />
              <span>Số hóa</span>
            </div>
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Smartphone className="w-4 h-4 mr-2" />
              <span>Tha hóa</span>
            </div>
          </div>
          <ChevronDown className="w-8 h-8 mx-auto mt-8 animate-bounce text-yellow-300" />
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-red-800/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center space-x-2 py-4">
            {[
              { id: 'intro', label: 'Đặt vấn đề', icon: AlertCircle },
              { id: 'theory', label: 'Lý thuyết', icon: Lightbulb },
              { id: 'reality', label: 'Thực trạng', icon: Network },
              { id: 'conclusion', label: 'Kết luận', icon: User }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg scale-105'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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
      <main className="relative max-w-5xl mx-auto px-6 py-12">
        
        {/* Đặt vấn đề */}
        {activeTab === 'intro' && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-red-800/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Đặt vấn đề</h2>
              </div>
              
              <div className="relative bg-gradient-to-r from-red-900/40 to-orange-900/40 border-l-4 border-red-500 p-8 mb-8 rounded-r-xl backdrop-blur-sm">
                <div className="absolute -left-8 top-8 text-6xl text-red-500/30">"</div>
                <p className="text-lg text-gray-100 leading-relaxed italic mb-4">
                  Bản chất con người không phải là cái trừu tượng cố hữu của cá nhân riêng biệt, 
                  mà là tổng hòa những mối quan hệ xã hội.
                </p>
                <div className="flex items-center justify-end">
                  <div className="bg-red-600/80 px-4 py-2 rounded-lg">
                    <p className="text-yellow-300 font-bold">— Karl Marx</p>
                  </div>
                </div>
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
                <div className="flex items-start mb-4">
                  <div className="text-4xl mr-4">❓</div>
                  <h3 className="text-2xl font-bold text-yellow-300">Câu hỏi nghiên cứu</h3>
                </div>
                <div className="space-y-4 text-gray-100">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Nếu các quan hệ xã hội là nền tảng hình thành bản chất con người mà giờ đây chúng ngày càng <span className="text-yellow-300 font-semibold">ảo hóa, phi vật chất hóa</span>...</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Thì <span className="text-yellow-300 font-semibold">bản chất con người</span> có đang bị biến đổi tận gốc rễ?</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Liệu con người có <span className="text-yellow-300 font-semibold">nguy cơ đánh mất</span> chính bản chất của mình?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lý thuyết */}
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
                {/* Section 1 */}
                <div className="group bg-gradient-to-br from-blue-900/20 to-blue-800/20 p-6 rounded-xl border border-blue-700/30 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-300">Con người và bản chất con người</h3>
                  </div>
                  <div className="space-y-4 ml-14">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="text-blue-200 font-semibold mb-1">Bản chất lịch sử - xã hội</p>
                        <p className="text-gray-300 text-sm">Không cố định, bẩm sinh mà được hình thành và phát triển qua lịch sử</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="text-blue-200 font-semibold mb-1">Tổng hòa các mối quan hệ xã hội</p>
                        <p className="text-gray-300 text-sm">Qua các mối quan hệ: kinh tế, chính trị, văn hóa, gia đình...</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="text-blue-200 font-semibold mb-1">Thực tiễn lao động sản xuất</p>
                        <p className="text-gray-300 text-sm">Hoạt động cơ bản tạo nên con người, phân biệt với động vật</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="group bg-gradient-to-br from-red-900/20 to-red-800/20 p-6 rounded-xl border border-red-700/30 hover:border-red-500 transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-red-300">Hiện tượng tha hóa con người</h3>
                  </div>
                  <div className="space-y-4 ml-14">
                    <div className="bg-red-950/50 p-4 rounded-lg">
                      <p className="text-red-200 font-semibold mb-2">💡 Khái niệm</p>
                      <p className="text-gray-300 text-sm">Sản phẩm lao động, hoạt động lao động trở thành cái xa lạ, đối lập với con người</p>
                    </div>
                    <div className="bg-red-950/50 p-4 rounded-lg">
                      <p className="text-red-200 font-semibold mb-2">🔍 Nguyên nhân</p>
                      <p className="text-gray-300 text-sm">Chế độ tư hữu, phân công lao động bất hợp lý trong xã hội có giai cấp</p>
                    </div>
                    <div className="bg-red-950/50 p-4 rounded-lg">
                      <p className="text-red-200 font-semibold mb-2">⚠️ Biểu hiện</p>
                      <p className="text-gray-300 text-sm">Con người bị chi phối bởi sản phẩm mình tạo ra, mất quyền tự do sáng tạo</p>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="group bg-gradient-to-br from-green-900/20 to-green-800/20 p-6 rounded-xl border border-green-700/30 hover:border-green-500 transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h3 className="text-2xl font-bold text-green-300">Giải phóng con người</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 ml-14">
                    <div className="bg-green-950/50 p-4 rounded-lg text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <p className="text-green-200 font-semibold mb-2">Mục tiêu</p>
                      <p className="text-gray-300 text-sm">Giải phóng khỏi áp bức, bóc lột</p>
                    </div>
                    <div className="bg-green-950/50 p-4 rounded-lg text-center">
                      <div className="text-3xl mb-2">🛤️</div>
                      <p className="text-green-200 font-semibold mb-2">Con đường</p>
                      <p className="text-gray-300 text-sm">Cách mạng xã hội, xây dựng CNXH</p>
                    </div>
                    <div className="bg-green-950/50 p-4 rounded-lg text-center">
                      <div className="text-3xl mb-2">✨</div>
                      <p className="text-green-200 font-semibold mb-2">Ý nghĩa</p>
                      <p className="text-gray-300 text-sm">Phát triển toàn diện, tự do</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <p className="text-gray-300 text-sm flex items-center">
                  <span className="text-2xl mr-3">📚</span>
                  <span><strong className="text-yellow-400">Tài liệu tham khảo:</strong> Giáo trình Triết học Mác - Lênin (2021), trang 447-464</span>
                </p>
              </div>
            </div>

            {/* Mini Quiz */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-8 border border-purple-700/50">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl mr-3">🧠</span>
                Kiểm tra kiến thức
              </h3>
              <p className="text-gray-200 mb-6">{quizQuestion.question}</p>
              <div className="space-y-3">
                {quizQuestion.options.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setQuizAnswer(option.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                      quizAnswer === option.id
                        ? option.correct
                          ? 'bg-green-600 border-green-400 text-white'
                          : 'bg-red-600 border-red-400 text-white'
                        : 'bg-gray-800/50 border-gray-700 text-gray-200 hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="font-bold mr-3">{option.id.toUpperCase()}.</span>
                    {option.text}
                    {quizAnswer === option.id && option.correct && <span className="ml-2">✓</span>}
                    {quizAnswer === option.id && !option.correct && <span className="ml-2">✗</span>}
                  </button>
                ))}
              </div>
              {quizAnswer && (
                <div className={`mt-4 p-4 rounded-lg ${
                  quizQuestion.options.find(o => o.id === quizAnswer)?.correct
                    ? 'bg-green-900/50 text-green-200'
                    : 'bg-red-900/50 text-red-200'
                }`}>
                  {quizQuestion.options.find(o => o.id === quizAnswer)?.correct
                    ? '🎉 Chính xác! Đây là quan điểm cốt lõi của Marx về con người.'
                    : '💭 Chưa đúng. Hãy xem lại phần lý thuyết nhé!'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Thực trạng */}
        {activeTab === 'reality' && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-red-800/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Phân tích theo Triết học Mác - Lênin</h2>
              </div>

              {/* Comparison Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-700/50 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <Network className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-blue-300">Sự chuyển đổi quan hệ xã hội</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { from: 'Trực tiếp', to: 'Ảo (mạng xã hội)', icon: '💬' },
                      { from: 'Tập thể', to: 'Cá nhân (từ xa)', icon: '👥' },
                      { from: 'Vật chất', to: 'Phi vật chất', icon: '📱' },
                      { from: 'Thực', to: 'Bản thân ảo', icon: '🎭' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center bg-blue-950/50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <div className="flex-1">
                          <span className="text-gray-300">{item.from}</span>
                          <span className="text-blue-400 mx-2">→</span>
                          <span className="text-blue-200 font-semibold">{item.to}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl p-6 border border-red-700/50 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-red-300">Hệ quả có thể xảy ra</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { text: 'Cô đơn, xa cách trong giao tiếp', icon: '😔' },
                      { text: 'Mất kết nối cộng đồng thực', icon: '🏘️' },
                      { text: 'Nhầm lẫn giữa thực - ảo', icon: '🌀' },
                      { text: 'Tha hóa trong môi trường số', icon: '⚠️' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center bg-red-950/50 p-3 rounded-lg">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <span className="text-gray-200">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Analysis Sections */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-6 border-l-4 border-green-500">
                  <h4 className="font-bold text-xl text-green-300 mb-3 flex items-center">
                    <span className="text-2xl mr-3">✅</span>
                    1. Bản chất con người CÓ thay đổi nhưng KHÔNG mất đi
                  </h4>
                  <p className="text-gray-200 leading-relaxed">
                    Theo Mác, bản chất con người vốn là <span className="text-green-400 font-semibold">lịch sử - xã hội</span>, 
                    nên nó luôn biến đổi theo sự phát triển của xã hội. Quan hệ xã hội số hóa là 
                    <span className="text-green-400 font-semibold"> hình thức mới</span>, nhưng VẪN là quan hệ xã hội. 
                    Con người vẫn tương tác, giao tiếp, lao động - chỉ là hình thức khác.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-xl p-6 border-l-4 border-orange-500">
                  <h4 className="font-bold text-xl text-orange-300 mb-3 flex items-center">
                    <span className="text-2xl mr-3">⚠️</span>
                    2. Nguy cơ tha hóa mới trong thời đại số
                  </h4>
                  <p className="text-gray-200 mb-4">
                    <span className="text-orange-400 font-semibold">Tha hóa kỹ thuật số:</span> Con người bị chi phối bởi 
                    thuật toán, mạng xã hội, công nghệ - tương tự như bị chi phối bởi máy móc trong thời đại công nghiệp.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { icon: '📱', text: 'Nghiện công nghệ' },
                      { icon: '⏰', text: 'Làm việc 24/7' },
                      { icon: '🔒', text: 'Dữ liệu bị khai thác' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-red-950/50 p-3 rounded-lg text-center">
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <p className="text-gray-300 text-sm">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-6 border-l-4 border-purple-500">
                  <h4 className="font-bold text-xl text-purple-300 mb-3 flex items-center">
                    <span className="text-2xl mr-3">💪</span>
                    3. Con người vẫn là "chủ thể" của lịch sử
                  </h4>
                  <p className="text-gray-200 leading-relaxed">
                    Công nghệ do con người tạo ra, nên con người hoàn toàn có khả năng 
                    <span className="text-purple-400 font-semibold"> định hướng, kiểm soát</span> nó. 
                    Cần có nhận thức đúng đắn và hành động tập thể để giải phóng con người 
                    khỏi tha hóa mới này.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Kết luận */}
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
                  <h3 className="font-bold text-2xl text-green-300 mb-6 flex items-center">
                    <span className="text-3xl mr-3">✅</span>
                    Trả lời câu hỏi nghiên cứu
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-green-950/50 p-6 rounded-xl">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-green-200 font-bold text-lg mb-2">
                            Bản chất con người có bị biến đổi tận gốc rễ?
                          </p>
                          <p className="text-gray-300 leading-relaxed">
                            → <span className="text-green-400 font-bold">KHÔNG</span>. Bản chất con người vẫn là 
                            "tổng hòa các mối quan hệ xã hội", chỉ là các mối quan hệ này có 
                            <span className="text-green-300"> hình thức mới</span> trong thời đại số.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-950/50 p-6 rounded-xl">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-green-200 font-bold text-lg mb-2">
                            Con người có nguy cơ đánh mất bản chất?
                          </p>
                          <p className="text-gray-300 leading-relaxed">
                            → <span className="text-orange-400 font-bold">CÓ</span> nguy cơ tha hóa mới, 
                            nhưng <span className="text-green-400 font-bold">KHÔNG</span> đánh mất hoàn toàn 
                            nếu con người tự giác và có hành động đúng đắn.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-700/50">
                  <h3 className="font-bold text-2xl text-blue-300 mb-6 flex items-center">
                    <span className="text-3xl mr-3">💡</span>
                    Giải pháp từ Triết học Mác - Lênin
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { 
                        icon: '🧠', 
                        title: 'Nâng cao nhận thức',
                        desc: 'Hiểu đúng bản chất con người, không để công nghệ chi phối',
                        color: 'from-blue-600 to-cyan-600'
                      },
                      { 
                        icon: '⚖️', 
                        title: 'Phát triển toàn diện',
                        desc: 'Cân bằng giữa đời sống số và thực, kết nối cộng đồng',
                        color: 'from-purple-600 to-pink-600'
                      },
                      { 
                        icon: '🏛️', 
                        title: 'Vai trò của xã hội',
                        desc: 'Nhà nước quản lý công nghệ phục vụ con người',
                        color: 'from-green-600 to-emerald-600'
                      },
                      { 
                        icon: '🤝', 
                        title: 'Hành động tập thể',
                        desc: 'Cùng xây dựng không gian số lành mạnh, nhân văn',
                        color: 'from-orange-600 to-red-600'
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="group bg-gray-800/50 p-6 rounded-xl hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-blue-500">
                        <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <span className="text-3xl">{item.icon}</span>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                        <p className="text-gray-300 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative bg-gradient-to-br from-red-900/40 to-orange-900/40 rounded-xl p-8 border border-red-700/50 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-3">🎯</span>
                      <h3 className="font-bold text-2xl text-yellow-300">Thông điệp</h3>
                    </div>
                    <div className="bg-black/30 p-6 rounded-xl backdrop-blur-sm">
                      <p className="text-gray-100 leading-relaxed italic text-lg">
                        "Công nghệ số là <span className="text-yellow-300 font-semibold">công cụ</span>, 
                        không phải là <span className="text-red-300 font-semibold">mục đích</span>. 
                        Con người phải là <span className="text-green-300 font-semibold">trung tâm</span>, 
                        là <span className="text-blue-300 font-semibold">chủ thể</span> của mọi sự phát triển. 
                        Chúng ta cần ứng dụng triết học Mác - Lênin để định hướng công nghệ 
                        phục vụ cho sự phát triển toàn diện của con người, thay vì để con người 
                        trở thành nô lệ của công nghệ."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thank you card */}
            <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-2xl p-12 text-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative">
                <div className="text-6xl mb-4 animate-bounce">🎓</div>
                <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
                  Cảm ơn cô đã theo dõi!
                </h3>
                <p className="text-xl text-red-100 mb-2">
                  Đề tài: Bản chất con người trong thời đại số hóa
                </p>
                <p className="text-red-200 text-sm">
                  Theo góc nhìn Triết học Mác - Lênin
                </p>
                <div className="flex items-center justify-center space-x-2 mt-6">
                  <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse delay-75"></div>
                  <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

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
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}