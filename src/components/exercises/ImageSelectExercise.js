import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

// Helper function to shuffle an array (re-defined here for ImageSelectExercise)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ImageSelectExercise = ({ exercise, onComplete }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]); // Novo estado para opções embaralhadas

  useEffect(() => {
    // Embaralha as opções quando o componente monta ou o exercício muda
    setShuffledOptions(shuffleArray(exercise.options));
    setSelectedOptionIndex(null); // Reset selection for new exercise
    setIsFeedbackVisible(false); // Hide feedback for new exercise
  }, [exercise]);

  const handleCheck = () => {
    if (selectedOptionIndex === null) return;

    // Usar shuffledOptions para obter o valor da opção selecionada
    const selectedOptionValue = shuffledOptions[selectedOptionIndex];
    const isCorrect = selectedOptionValue === exercise.correctOption;
    
    setIsFeedbackVisible(true);

    setTimeout(() => {
      setIsFeedbackVisible(false);
      onComplete(isCorrect);
      setSelectedOptionIndex(null); 
    }, 1500); 
  };

  return (
    <div className="text-center w-full max-w-lg">
      <h2 className="text-xl mb-6 text-gray-700">Qual destas é &quot;{exercise.word}&quot;?</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {shuffledOptions.map((opt, idx) => ( // Usar shuffledOptions aqui
          <button
            key={opt} // Usar opt como key se for único, ou idx se houver risco de duplicatas no opt
            onClick={() => setSelectedOptionIndex(idx)}
            className={`relative p-4 border-2 rounded-xl flex flex-col items-center transition-all ${selectedOptionIndex === idx ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="w-32 h-32 bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden border border-gray-100 p-2">
               <Image src={`/${opt}`} alt={opt} width={128} height={128} className="w-full h-full object-contain" />
            </div>
            
            {selectedOptionIndex === idx && (
              <div className="absolute top-2 right-2 text-blue-500">
                <CheckCircle size={20} fill="currentColor" className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
      <button 
        onClick={handleCheck} 
        disabled={selectedOptionIndex === null || isFeedbackVisible}
        className="w-full py-4 bg-green-500 text-white rounded-xl font-bold text-lg uppercase tracking-wider hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_0_0_#16a34a] active:shadow-none active:translate-y-[4px]"
      >
        Verificar
      </button>

      {isFeedbackVisible && (
        <div className={`fixed bottom-0 left-0 right-0 p-4 text-white text-center font-bold text-lg shadow-lg z-50 ${shuffledOptions[selectedOptionIndex] === exercise.correctOption ? 'bg-green-500' : 'bg-red-500'}`}>
          {shuffledOptions[selectedOptionIndex] === exercise.correctOption ? 'Correto!' : 'Incorreto!'}
        </div>
      )}
    </div>
  );
};

export default ImageSelectExercise;