import React, { useState, useEffect } from 'react';

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const TranslationExercise = ({ exercise, onComplete }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([]); // Inicializa como array vazio
  const [showErrorMessage, setShowErrorMessage] = useState(false); 

  useEffect(() => {
    // Resetar palavras e embaralhar quando o exercício muda
    setSelectedWords([]);
    setAvailableOptions(shuffleArray(exercise.options)); // Embaralha as opções
    setShowErrorMessage(false); 
  }, [exercise]);

  useEffect(() => {
    let timer;
    if (showErrorMessage) {
      timer = setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showErrorMessage]);

  const handleWordClick = (word) => {
    setSelectedWords([...selectedWords, word]);
    setAvailableOptions(availableOptions.filter(w => w !== word));
    setShowErrorMessage(false);
  };

  const handleSelectedWordClick = (word) => {
    setAvailableOptions([...availableOptions, word]); // Adicionar palavra de volta às opções disponíveis
    setSelectedWords(selectedWords.filter(w => w !== word));
    setShowErrorMessage(false);
  };

  const checkAnswer = () => {
    const formedSentence = selectedWords.join(' ');
    const isCorrect = formedSentence.toLowerCase() === exercise.english.toLowerCase();
    
    if (isCorrect) {
      onComplete(true);
    } else {
      setSelectedWords([]);
      setAvailableOptions(shuffleArray(exercise.options)); // Re-embaralha as opções no erro
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="text-center max-w-lg w-full">
      <h2 className="text-xl mb-8 text-gray-700">Traduza esta frase:</h2>
      
      <div className="mb-8 p-4">
        <p className="text-2xl font-bold text-gray-800">{exercise.portuguese}</p>
      </div>

      {/* Drop Zone */}
      <div className="min-h-[60px] border-b-2 border-gray-200 mb-8 flex flex-wrap justify-center gap-2 p-2">
        {selectedWords.map((word, idx) => (
          <button 
            key={idx} 
            onClick={() => handleSelectedWordClick(word)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 font-medium hover:bg-gray-50 animate-in fade-in zoom-in duration-200"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Mensagem de erro amigável */}
      {showErrorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-in fade-in duration-200">
          Ops! Essa não é a ordem correta. Tente novamente!
        </div>
      )}

      {/* Word Bank */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {availableOptions.map((word, idx) => (
          <button 
            key={idx} 
            onClick={() => handleWordClick(word)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-[0_2px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[2px] text-gray-800 font-medium hover:bg-gray-50 transition-all"
          >
            {word}
          </button>
        ))}
      </div>

      <button 
        onClick={checkAnswer} 
        disabled={selectedWords.length === 0}
        className="w-full py-4 bg-green-500 text-white rounded-xl font-bold text-lg uppercase tracking-wider hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_0_0_#16a34a] active:shadow-none active:translate-y-[4px]"
      >
        Verificar
      </button>
    </div>
  );
};

export default TranslationExercise;