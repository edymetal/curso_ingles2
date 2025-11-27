'use client';

import Link from 'next/link';
import { course } from '../data/course-schema';
import { useLearningStore } from '../store/use-learning-store';
import { useEffect, useState } from 'react';
import ConfirmationModal from '../components/common/ConfirmationModal';

// Mapping unit indices to Bootstrap Icons and colors for visual variety
const unitVisuals = [
  { icon: 'bi-cup-hot-fill', color: 'bg-green-500', shadow: 'shadow-green-200' },
  { icon: 'bi-airplane-fill', color: 'bg-blue-500', shadow: 'shadow-blue-200' },
  { icon: 'bi-shop', color: 'bg-orange-500', shadow: 'shadow-orange-200' },
  { icon: 'bi-people-fill', color: 'bg-purple-500', shadow: 'shadow-purple-200' },
  { icon: 'bi-pencil-fill', color: 'bg-pink-500', shadow: 'shadow-pink-200' },
];

export default function Home() {
  const { xp, streak, completedNodes, resetLearningProgress } = useLearningStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleResetConfirm = () => {
    resetLearningProgress();
    setShowResetConfirmation(false);
  };

  const handleResetCancel = () => {
    setShowResetConfirmation(false);
  };

  if (!isHydrated) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <p className="text-xl text-slate-700">Carregando progresso...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             {/* Logo Placeholder - Could be an SVG */}
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white">
              <i className="bi bi-translate text-lg"></i>
            </div>
            <h1 className="hidden md:block text-xl font-extrabold text-green-600 tracking-tight">LINGUOLAB</h1>
          </div>
          
          <div className="flex items-center space-x-6 text-sm font-bold text-slate-600">
            <div className="flex items-center gap-2 hover:bg-slate-100 px-2 py-1 rounded-lg transition-colors cursor-pointer" title="XP Total">
              <i className="bi bi-lightning-fill text-yellow-400 text-lg"></i>
              <span>{xp}</span>
            </div>
            <div className="flex items-center gap-2 hover:bg-slate-100 px-2 py-1 rounded-lg transition-colors cursor-pointer" title="Dias de Ofensiva">
              <i className="bi bi-fire text-orange-500 text-lg"></i>
              <span>{streak}</span>
            </div>
            {/* User Avatar */}
            <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-300 transition-colors cursor-pointer border-2 border-white shadow-sm">
              <i className="bi bi-person-fill text-xl"></i>
            </div>
            {/* Botão de Resetar Progresso Total */}
                        <button
                          onClick={() => setShowResetConfirmation(true)}
                          className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold hover:bg-red-600 transition-colors"
                          title="Resetar todo o progresso (XP, Ofensiva, Lições Concluídas)"
                        >
                          Resetar Progresso Total
                        </button>
                      </div>
                    </div>
                  </header>
            
                  {/* Main Content Area */}
                  <main className="flex-grow flex justify-center p-4 md:p-8 overflow-hidden relative">
            
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-50">
                        <i className="bi bi-cloud-fill text-slate-200 text-6xl absolute top-20 left-10 animate-pulse"></i>
                        <i className="bi bi-cloud-fill text-slate-200 text-4xl absolute top-40 right-20"></i>
                        <i className="bi bi-stars text-yellow-200 text-3xl absolute top-10 right-1/3"></i>
                    </div>
            
                    <div className="max-w-2xl w-full relative z-10">
                      {course.sections.map((section) => (
                        <div key={section.id} className="mb-16">
                          <div className="bg-green-600 text-white p-4 rounded-2xl shadow-lg mb-10 text-center relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold tracking-wide uppercase">{section.title}</h3>
                                <p className="text-green-100 text-sm mt-1">Continue sua jornada!</p>
                            </div>
                            <i className="bi bi-journal-richtext absolute -bottom-4 -right-4 text-8xl text-green-700 opacity-50 transform rotate-12"></i>
                          </div>
            
                          <div className="relative flex flex-col items-center space-y-8">
                            {/* Path Line */}
                            <div className="absolute top-4 bottom-4 w-2 bg-slate-200 rounded-full -z-10"></div>
            
                            {section.units.map((unit, index) => {
                              const visual = unitVisuals[index % unitVisuals.length];
                              const isContentReady = unit.lessons && unit.lessons.length > 0;
            
                              // Determine completion status of this unit
                              const completedLessonIds = unit.lessons ? unit.lessons.filter(l => completedNodes.includes(l.id)) : [];
                              const isUnitCompleted = isContentReady && completedLessonIds.length === unit.lessons.length;
            
                              // Determine the next active lesson to link to
                              // If unit is completed, we can link to the last one for review, or the first one. Let's link to the first for review.
                              // If not completed, find the first incomplete lesson.
                              const activeLesson = isContentReady
                                ? (unit.lessons.find(l => !completedNodes.includes(l.id)) || unit.lessons[0])
                                : null;
            
                              // Check if previous unit is completed to unlock this one
                              const previousUnit = index > 0 ? section.units[index - 1] : null;
                              const isPreviousUnitCompleted = previousUnit
                                ? previousUnit.lessons && previousUnit.lessons.every(l => completedNodes.includes(l.id))
                                : true; // First unit is always unlocked by progression
            
                              const isLocked = !isContentReady || !isPreviousUnitCompleted;
                              const isComingSoon = !isContentReady && isPreviousUnitCompleted;
            
                              return (
                                <div key={unit.id} className="relative group w-full flex flex-col items-center">
            
                                  {/* Unit Node (Circle) */}
                                  <div className={`
                                    w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center
                                    border-4 ${isUnitCompleted ? 'border-yellow-400' : 'border-white'}
                                    ${visual.shadow} shadow-xl
                                    ${isLocked ? 'bg-slate-300 grayscale' : (isUnitCompleted ? 'bg-yellow-400' : visual.color)}
                                    transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 z-10
                                    cursor-pointer
                                  `}>
                                    {isUnitCompleted ? (
                                         <i className="bi bi-check-lg text-4xl text-white"></i>
                                    ) : (
                                         <i className={`bi ${visual.icon} text-3xl md:text-4xl text-white`}></i>
                                    )}
            
                                    {/* Status Star indicator */}
                                    {!isLocked && !isUnitCompleted && (
                                        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1 border-2 border-white">
                                            <i className="bi bi-star-fill text-white text-xs"></i>
                                        </div>
                                    )}
                                  </div>
            
                                  {/* Popover / Card content appearing below or on hover */}
                                  <div className="mt-4 bg-white p-5 rounded-2xl shadow-md border border-slate-100 w-full max-w-sm text-center transition-all hover:shadow-lg relative">
                                    {/* Speech bubble arrow pointing up */}
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>
            
                                      <h4 className="text-lg font-bold text-slate-700 mb-1">{unit.title}</h4>
                                      <p className="text-slate-500 text-sm mb-4 leading-relaxed">{unit.guide}</p>
            
                                      {isLocked ? (
                                        <button className="w-full py-2.5 bg-slate-100 text-slate-400 font-bold rounded-xl uppercase tracking-wide text-sm cursor-not-allowed" disabled>
                                          <i className="bi bi-lock-fill mr-2"></i>
                                          {isComingSoon ? 'Em Breve' : 'Bloqueado'}
                                        </button>
                                      ) : (
                                        <Link href={`/lesson/${activeLesson ? activeLesson.id : ''}`} className="block w-full">
                                          <button className={`
                                            w-full py-2.5 font-bold rounded-xl uppercase tracking-wide text-sm text-white shadow-md
                                            transform active:scale-95 transition-all
                                            ${isUnitCompleted ? 'bg-yellow-400 hover:bg-yellow-500' : visual.color + ' hover:brightness-110'}
                                          `}>
                                            {isUnitCompleted ? 'Revisar' : 'Começar'} <i className={`bi ${isUnitCompleted ? 'bi-arrow-counterclockwise' : 'bi-play-fill'} ml-1 text-lg align-middle`}></i>
                                          </button>
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </main>
            
                  {/* Mobile Bottom Nav (Optional Professional Touch) */}
                  <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 flex justify-around py-3 z-50 pb-safe">
                    <div className="flex flex-col items-center text-green-600">
                        <i className="bi bi-house-door-fill text-xl"></i>
                        <span className="text-xs font-bold mt-1">Aprender</span>
                    </div>
                    <div className="flex flex-col items-center text-slate-400 hover:text-slate-600">
                        <i className="bi bi-trophy-fill text-xl"></i>
                        <span className="text-xs font-bold mt-1">Ranking</span>
                    </div>
                    <div className="flex flex-col items-center text-slate-400 hover:text-slate-600">
                        <i className="bi bi-person-circle text-xl"></i>
                        <span className="text-xs font-bold mt-1">Perfil</span>
                    </div>
                      </nav>
            
                  <ConfirmationModal
                    isOpen={showResetConfirmation}
                    title="Resetar Progresso"
                    message="Deseja realmente apagar seu progresso e começar do zero? Esta ação é irreversível!"
                    onConfirm={handleResetConfirm}
                    onCancel={handleResetCancel}
                  />
                </div>