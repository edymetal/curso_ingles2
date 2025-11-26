'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { course } from '../../../data/course-schema';
import { useLearningStore } from '../../../store/use-learning-store';
import Link from 'next/link';
import { X } from 'lucide-react'; 
import TranslationExercise from '../../../components/exercises/TranslationExercise';
import PairMatchExercise from '../../../components/exercises/PairMatchExercise';
import ImageSelectExercise from '../../../components/exercises/ImageSelectExercise';
import SpeakingExercise from '../../../components/exercises/SpeakingExercise';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { lessonId } = params;
  const { xp, addXp, decreaseXp, markNodeCompleted, resetLearningProgress, resetCurrentLesson } = useLearningStore();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // New state for error message

  const lesson = useMemo(() => {
    let foundLesson = null;
    for (const section of course.sections) {
      for (const unit of section.units) {
        const l = unit.lessons.find(l => l.id === lessonId);
        if (l) {
          foundLesson = l;
          break;
        }
      }
      if (foundLesson) break;
    }
    return foundLesson;
  }, [lessonId]);

  const handleExerciseComplete = (isCorrect) => {
    if (isCorrect) {
      addXp(10); // Award XP for correct answer
      if (lesson && currentExerciseIndex < lesson.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setErrorMessage(null); // Clear error message on correct answer
      } else {
        setIsCompleted(true);
        addXp(20); // Bonus XP for completion
        markNodeCompleted(lessonId);
        setErrorMessage(null); // Clear error message on completion
      }
    } else {
      decreaseXp(5);
      setErrorMessage("Resposta incorreta! Você perdeu 5 pontos."); // Set error message
      setTimeout(() => {
        setErrorMessage(null); // Clear error message after 3 seconds
      }, 3000);
    }
  };

  const handleResetLesson = () => {
    resetCurrentLesson(lessonId); // Remove current lesson from completed nodes
    setIsCompleted(false); // Allow re-doing the lesson
    setCurrentExerciseIndex(0); // Start from the first exercise
    setErrorMessage(null); // Clear any error messages
  };
  
  if (!lesson) return <div className="p-8 text-center">Loading lesson...</div>;

  if (isCompleted) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-400 text-white p-4">
         <h1 className="text-4xl font-bold mb-4">Lição Concluída!</h1>
         <p className="text-2xl mb-8">+20 XP de Bônus</p>
         <button onClick={() => router.push('/')} className="px-8 py-4 bg-white text-yellow-500 rounded-full font-bold text-xl shadow-lg mb-4">
           Continuar
         </button>
         <button onClick={handleResetLesson} className="px-8 py-4 bg-white text-yellow-500 rounded-full font-bold text-xl shadow-lg mb-4">
           Refazer Lição
         </button>
         <button onClick={() => { resetLearningProgress(); router.push('/'); }} className="px-8 py-4 bg-white text-yellow-500 rounded-full font-bold text-xl shadow-lg">
           Resetar Progresso Total
         </button>
       </div>
    );
  }

  const currentExercise = lesson.exercises[currentExerciseIndex];

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Link href="/" className="text-gray-400 hover:text-gray-600">
          <X />
        </Link>
        <div className="w-full max-w-md bg-gray-200 rounded-full h-4 mx-4">
          <div 
            className="bg-green-500 h-4 rounded-full transition-all duration-500" 
            style={{ width: `${((currentExerciseIndex) / lesson.exercises.length) * 100}%` }}
          ></div>
        </div>
        <div className="text-yellow-500 font-bold flex items-center gap-1">
          <i className="bi bi-lightning-fill"></i> {xp}
        </div>
        {/* Novo botão de reset para a lição atual */}
        <button 
          onClick={handleResetLesson} 
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
        >
          Resetar Lição
        </button>
      </header>

      {/* Exercise Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 w-full">
        {currentExercise.type === 'translation' && (
          <TranslationExercise exercise={currentExercise} onComplete={handleExerciseComplete} />
        )}
        {currentExercise.type === 'pair-match' && (
           <PairMatchExercise exercise={currentExercise} onComplete={handleExerciseComplete} />
        )}
        {currentExercise.type === 'image-select' && (
           <ImageSelectExercise exercise={currentExercise} onComplete={handleExerciseComplete} />
        )}
        {currentExercise.type === 'repetition' && ( // Mapped from 'speaking' in schema logic or distinct type
           <SpeakingExercise exercise={currentExercise} onComplete={handleExerciseComplete} />
        )}
      </main>
      
      {/* Error Message Banner */}
      {errorMessage && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-red-500 text-white text-center font-bold text-lg shadow-lg z-50">
          {errorMessage}
        </div>
      )}
    </div>
  );
}