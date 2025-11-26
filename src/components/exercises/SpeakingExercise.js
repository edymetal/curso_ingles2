import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaMicrophone } from 'react-icons/fa'; // Ícones para play e microfone

const SpeakingExercise = ({ exercise, onComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false); // Novo estado para controlar a fala
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const voicesRef = useRef([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Configuração para reconhecimento de fala
      if ('webkitSpeechRecognition' in window) {
        const recognitionInstance = new webkitSpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.lang = 'en-US'; // Configurado para inglês (en-US) pois o curso é de inglês
        recognitionInstance.interimResults = false;

        recognitionInstance.onresult = (event) => {
          const text = event.results[0][0].transcript;
          setTranscript(text);
          setIsListening(false);
          
          // Validação simples: verifica se o texto falado contém palavras-chave
          if (text.toLowerCase().includes(exercise.phrase.toLowerCase().replace(/[.,!?]/g, ''))) {
             setTimeout(() => onComplete(true), 1000);
          } else {
              // Permite tentar novamente
          }
        };

        recognitionInstance.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          alert("Erro no reconhecimento de fala. Verifique suas permissões de microfone ou tente novamente.");
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognitionInstance;
      } else {
        alert("Reconhecimento de fala não suportado neste navegador.");
      }

      // Configuração para síntese de fala
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;

        const loadVoices = () => {
          voicesRef.current = synthRef.current.getVoices();
        };

        loadVoices();
        if (synthRef.current.onvoiceschanged !== undefined) {
          synthRef.current.onvoiceschanged = loadVoices;
        }
      } else {
        alert("Síntese de fala não suportada neste navegador.");
      }
    }
  }, [exercise.phrase, onComplete]);

  const handlePlayPhrase = () => {
    if (!synthRef.current) {
      alert("Síntese de fala não suportada neste navegador.");
      return;
    }

    if (isSpeaking) {
      synthRef.current.cancel(); // Para a fala atual se estiver falando
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(exercise.phrase);
    const englishVoice = voicesRef.current.find(
      (voice) => voice.lang === 'en-US' || voice.lang === 'en-GB'
    );

    utterance.voice = englishVoice || voicesRef.current[0];
    utterance.pitch = 1;
    utterance.rate = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error("Speech synthesis error", event);
      setIsSpeaking(false);
      alert("Erro ao reproduzir o áudio da frase.");
    };

    synthRef.current.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
        alert("Reconhecimento de fala não suportado neste navegador.");
        return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript(''); // Limpa o transcript anterior antes de começar a gravar
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="text-center w-full max-w-lg">
      <h2 className="text-xl mb-8 text-gray-700">Fale esta frase:</h2>
      
      <div className="mb-12">
        <p className="text-2xl font-bold text-gray-800 mb-4">{exercise.phrase}</p>
        <div className="flex justify-center">
           <button 
             onClick={handlePlayPhrase}
             disabled={isSpeaking}
             className="p-2 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 disabled:opacity-50"
           >
             <FaPlay className="inline-block" /> {/* Ícone de play */}
           </button>
        </div>
      </div>

      <div className="flex flex-col items-center mb-8">
        <button 
          onClick={toggleListening}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.6)]' : 'bg-blue-500 hover:bg-blue-600 shadow-[0_4px_0_0_#2563eb] active:translate-y-[4px] active:shadow-none'}`}
        >
          <FaMicrophone size={40} color="white" /> {/* Ícone de microfone */}
        </button>
        <p className="mt-4 text-gray-500 h-6">{isListening ? "Ouvindo..." : "Toque para falar"}</p>
      </div>

      {transcript && (
        <div className={`p-4 rounded-lg mb-6 ${transcript.toLowerCase().includes(exercise.phrase.toLowerCase().replace(/[.,!?]/g, '')) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          Você disse: &quot;{transcript}&quot;
        </div>
      )}

      <button 
        onClick={() => onComplete(true)} 
        className="text-gray-400 hover:text-gray-600 text-sm underline"
      >
        Não posso falar agora (Pular)
      </button>
    </div>
  );
};

export default SpeakingExercise;