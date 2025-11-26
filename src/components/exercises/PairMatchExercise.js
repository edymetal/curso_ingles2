import React, { useState, useEffect } from 'react';

const PairMatchExercise = ({ exercise, onComplete }) => {
  const [selectedPair, setSelectedPair] = useState([]); // [ {id, text, lang}, ... ]
  const [matchedPairs, setMatchedPairs] = useState([]); // List of matched words (ids)

  const [portugueseItems, setPortugueseItems] = useState([]);
  const [englishItems, setEnglishItems] = useState([]);

  useEffect(() => {
    // Reset states when exercise changes
    setSelectedPair([]);
    setMatchedPairs([]);

    const currentPairs = exercise.pairs.slice(0, 4); // Limita a 4 pares
    
    const pt = [];
    const en = [];

    currentPairs.forEach((pair, idx) => {
      pt.push({ id: `pt-${idx}`, text: pair.portuguese, type: 'pt', matchId: idx });
      en.push({ id: `en-${idx}`, text: pair.english, type: 'en', matchId: idx });
    });

    // Embaralha cada lista independentemente
    setPortugueseItems(pt.sort(() => Math.random() - 0.5));
    setEnglishItems(en.sort(() => Math.random() - 0.5));
  }, [exercise]);

  const handleItemClick = (item) => {
    // Não permite selecionar um item já casado
    if (matchedPairs.includes(item.id)) return;

    // Não permite selecionar o mesmo item duas vezes
    if (selectedPair.some(s => s.id === item.id)) {
      setSelectedPair([]); // Desseleciona se for o mesmo item
      return;
    }

    const newSelection = [...selectedPair, item];

    if (newSelection.length === 2) {
      const [first, second] = newSelection;

      // Garante que os tipos de idioma são diferentes (pt e en)
      if (first.type === second.type) {
        setSelectedPair(newSelection);
        setTimeout(() => setSelectedPair([]), 1000); // Limpa seleção se os tipos forem iguais
        return;
      }
      
      if (first.matchId === second.matchId) {
        // Match!
        const newMatchedPairs = [...matchedPairs, first.id, second.id];
        setMatchedPairs(newMatchedPairs);
        setSelectedPair([]);
        
        // Verifica se todos os pares foram combinados
        if (newMatchedPairs.length === (portugueseItems.length + englishItems.length)) {
          setTimeout(() => onComplete(true), 500);
        }
      } else {
        // No match, limpa seleção após um breve atraso
        setSelectedPair(newSelection);
        setTimeout(() => setSelectedPair([]), 1000);
      }
    } else {
      setSelectedPair(newSelection);
    }
  };

  return (
    <div className="text-center w-full max-w-xl mx-auto">
      <h2 className="text-xl mb-6 text-gray-700">Combine os pares:</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Coluna da Esquerda: Português */}
        <div className="flex flex-col gap-3">
          {portugueseItems.map((item) => {
            const isSelected = selectedPair.some(s => s.id === item.id);
            const isMatched = matchedPairs.includes(item.id);
            
            let bgClass = "bg-white border-gray-300";
            if (isSelected) bgClass = "bg-blue-100 border-blue-400 text-blue-600";
            if (isMatched) bgClass = "bg-green-100 border-green-400 text-green-600 opacity-50 pointer-events-none"; // Adicionado pointer-events-none

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={isMatched}
                className={`p-4 border-2 rounded-xl font-medium shadow-sm transition-all duration-200 ${bgClass} ${!isMatched && 'hover:bg-gray-50 active:translate-y-[2px]'}`}
              >
                {item.text}
              </button>
            );
          })}
        </div>

        {/* Coluna da Direita: Inglês */}
        <div className="flex flex-col gap-3">
          {englishItems.map((item) => {
            const isSelected = selectedPair.some(s => s.id === item.id);
            const isMatched = matchedPairs.includes(item.id);
            
            let bgClass = "bg-white border-gray-300";
            if (isSelected) bgClass = "bg-blue-100 border-blue-400 text-blue-600";
            if (isMatched) bgClass = "bg-green-100 border-green-400 text-green-600 opacity-50 pointer-events-none"; // Adicionado pointer-events-none
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={isMatched}
                className={`p-4 border-2 rounded-xl font-medium shadow-sm transition-all duration-200 ${bgClass} ${!isMatched && 'hover:bg-gray-50 active:translate-y-[2px]'}`}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PairMatchExercise;