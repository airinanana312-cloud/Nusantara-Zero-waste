import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, CheckCircle2, XCircle, Award, 
  ArrowRight, RotateCcw, Info, Sparkles 
} from 'lucide-react';
import { ECO_QUIZ_QUESTIONS } from '../data';

export default function EcoQuiz() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const handleOptionClick = (optIndex: number) => {
    if (isAnswered) return;
    setSelectedOpt(optIndex);
  };

  const handleAnswerSubmit = () => {
    if (selectedOpt === null || isAnswered) return;
    
    const isCorrect = selectedOpt === ECO_QUIZ_QUESTIONS[currentIdx].correctAnswerIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setIsAnswered(false);
    
    if (currentIdx < ECO_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const currentQuestion = ECO_QUIZ_QUESTIONS[currentIdx];

  return (
    <section id="eco-quiz" className="py-20 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Game Edukatif
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
            Eco-Knowledge Quiz
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base">
            Uji wawasan kepedulian lingkungan Anda tentang zero-waste dan jejak karbon dalam 5 pertanyaan interaktif berikut!
          </p>
        </div>

        {/* Quiz Main Card */}
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm relative">
          
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -15, x: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                {/* Score Progress */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-100 pb-3">
                  <span>SOAL {currentIdx + 1} DARI {ECO_QUIZ_QUESTIONS.length}</span>
                  <span className="text-emerald-600">Skor: {score}</span>
                </div>

                {/* Question */}
                <h4 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-relaxed">
                  {currentQuestion.question}
                </h4>

                {/* Options list */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOpt === idx;
                    const isCorrectAnswer = idx === currentQuestion.correctAnswerIndex;
                    
                    let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                    if (isAnswered) {
                      if (isCorrectAnswer) {
                        btnStyle = 'bg-emerald-500 border-emerald-500 text-white font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-500 border-red-500 text-white font-bold';
                      } else {
                        btnStyle = 'bg-white border-slate-100 text-slate-300 opacity-60';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(idx)}
                        disabled={isAnswered}
                        className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition duration-200 flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span className="leading-relaxed pr-4">{option}</span>
                        {isAnswered && isCorrectAnswer && <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-white" />}
                        {isAnswered && isSelected && !isCorrectAnswer && <XCircle className="h-5 w-5 flex-shrink-0 text-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanatory Panel */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border flex gap-3 ${
                      selectedOpt === currentQuestion.correctAnswerIndex 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                        : 'bg-red-50 border-red-100 text-red-800'
                    }`}
                  >
                    <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs">
                      <span className="font-bold uppercase tracking-wider">
                        {selectedOpt === currentQuestion.correctAnswerIndex ? 'Jawaban Benar!' : 'Jawaban Kurang Tepat'}
                      </span>
                      <p className="leading-relaxed text-slate-600 font-sans">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Navigation and Submission Controls */}
                <div className="pt-4 flex items-center justify-end">
                  {!isAnswered ? (
                    <button
                      onClick={handleAnswerSubmit}
                      disabled={selectedOpt === null}
                      className={`inline-flex items-center gap-1 text-xs font-bold px-5 py-3 rounded-xl transition ${
                        selectedOpt === null 
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                          : 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-sm'
                      }`}
                    >
                      Kirim Jawaban
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-600 text-white px-5 py-3 rounded-xl hover:bg-emerald-700 transition cursor-pointer shadow-md shadow-emerald-600/10"
                    >
                      {currentIdx < ECO_QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>

              </motion.div>
            ) : (
              <motion.div
                key="summary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-6"
              >
                <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <Award className="h-8 w-8 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-extrabold text-slate-900">Kuis Selesai!</h3>
                  <p className="text-sm text-slate-500">Hasil kecerdasan ekologis harian Anda:</p>
                </div>

                <div className="inline-block bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
                  <span className="block font-display text-6xl font-black text-emerald-600">
                    {score * 20} <span className="text-xl font-bold text-slate-400">/ 100</span>
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 block">
                    Menjawab {score} dari {ECO_QUIZ_QUESTIONS.length} Soal dengan Benar
                  </span>
                </div>

                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  {score === 5 && 'Luar biasa sempurna! Anda memiliki pemahaman ekologi dan gaya hidup sirkular yang sangat matang.'}
                  {score >= 3 && score < 5 && 'Sangat bagus! Anda memahami konsep dasar keberlanjutan. Sedikit pemahaman lagi akan membuat Anda jadi ahli iklim.'}
                  {score < 3 && 'Awal yang baik! Membaca edukasi 5R dan rincian katalog swap di landing page ini akan membantumu memahami isu iklim lebih mendalam.'}
                </p>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={restartQuiz}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-5 py-3 rounded-xl cursor-pointer hover:bg-slate-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Coba Lagi
                  </button>
                  
                  <button
                    onClick={() => {
                      const el = document.getElementById('calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-900 text-white px-5 py-3 rounded-xl cursor-pointer hover:bg-slate-800 shadow-sm"
                  >
                    Hitung Jejak Karbon
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
