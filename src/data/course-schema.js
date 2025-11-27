export const course = {
  sections: [
    {
      id: 'section-1',
      title: 'Seção 1: Primeiros Passos',
      units: [
        {
          id: 'unit-1',
          title: 'Unidade 1: Pedir em um café e apresentar-se',
          guide: 'Nesta unidade, você aprenderá vocabulário básico para pedir em um café (café, chá, leite) e frases para se apresentar (Olá, meu nome é...).',
          lessons: [
            {
              id: 'lesson-1-1',
              type: 'vocabulary',
              exercises: [
                { type: 'translation', portuguese: 'Eu bebo água', english: 'I drink water', options: ['I', 'drink', 'water'] },
                { type: 'pair-match', pairs: [{ english: 'Water', portuguese: 'Água' }, { english: 'Coffee', portuguese: 'Café' }, { english: 'Milk', portuguese: 'Leite' }, { english: 'Tea', portuguese: 'Chá' }] },
                { type: 'image-select', word: 'the boy', options: ['boy.png', 'girl.png'], correctOption: 'boy.png' },
                { type: 'translation', portuguese: 'Ele come pão', english: 'He eats bread', options: ['He', 'eats', 'bread'] },
                { type: 'repetition', phrase: 'My name is' }
              ]
            }
          ],

        {
          id: 'unit-2',
          title: 'Unidade 2: Falar sobre viagens',
          guide: 'Aprenda vocabulário relacionado a viagens (táxi, passaporte, hotel) e frases comuns.',
          lessons: [
             {
              id: 'lesson-2-1',
              type: 'vocabulary',
              exercises: [
                 { type: 'translation', portuguese: 'O táxi', english: 'The taxi', options: ['The', 'taxi', 'bus'] },
                 { type: 'translation', portuguese: 'O passaporte', english: 'The passport', options: ['The', 'passport', 'visa'] },
                 { type: 'pair-match', pairs: [{ english: 'Hotel', portuguese: 'Hotel' }, { english: 'Luggage', portuguese: 'Bagagem' }, { english: 'Airport', portuguese: 'Aeroporto' }, { english: 'Flight', portuguese: 'Voo' }] },
                 { type: 'image-select', word: 'the car', options: ['car.png', 'boy.png'], correctOption: 'car.png' },
                 { type: 'repetition', phrase: 'I want a ticket' }
              ]
             }
          ]
        },
        {
          id: 'unit-3',
          title: 'Unidade 3: Pedir em restaurante e trocar contatos',
          guide: 'Frases para pedir comida em um restaurante e trocar informações de contato.',
          lessons: [
            {
              id: 'lesson-3-1',
              type: 'vocabulary',
              exercises: [
                 { type: 'translation', portuguese: 'Eu quero água', english: 'I want water', options: ['I', 'want', 'water'] },
                 { type: 'pair-match', pairs: [{ english: 'Food', portuguese: 'Comida' }, { english: 'Drink', portuguese: 'Bebida' }, { english: 'Menu', portuguese: 'Cardápio' }, { english: 'Waiter', portuguese: 'Garçom' }] },
                 { type: 'image-select', word: 'the food', options: ['food.png', 'boy.png'], correctOption: 'food.png' },
                 { type: 'repetition', phrase: 'Can I have the menu?' },
                 { type: 'translation', portuguese: 'A conta por favor', english: 'The bill please', options: ['The', 'bill', 'please'] }
              ]
            }
          ]
        },
        {
          id: 'unit-4',
          title: 'Unidade 4: Falar sobre família',
          guide: 'Vocabulário e frases sobre membros da família (mãe, pai, irmão).',
          lessons: [
            {
              id: 'lesson-4-1',
              type: 'vocabulary',
              exercises: [
                 { type: 'translation', portuguese: 'Minha mãe', english: 'My mother', options: ['My', 'mother'] },
                 { type: 'pair-match', pairs: [{ english: 'Father', portuguese: 'Pai' }, { english: 'Sister', portuguese: 'Irmã' }, { english: 'Brother', portuguese: 'Irmão' }, { english: 'Grandmother', portuguese: 'Avó' }] },
                 { type: 'image-select', word: 'the family', options: ['family.png', 'boy.png'], correctOption: 'family.png' },
                 { type: 'repetition', phrase: 'This is my brother' },
                 { type: 'translation', portuguese: 'Eu amo minha família', english: 'I love my family', options: ['I', 'love', 'my', 'family'] }
              ]
            }
          ]
        },
        {
          id: 'unit-5',
          title: 'Unidade 5: Introdução ao tempo presente simples',
          guide: 'Conceitos básicos do presente simples (I am, You are, He is).',
          lessons: [
            {
              id: 'lesson-5-1',
              type: 'grammar', // Changed type to grammar for this unit
              exercises: [
                 { type: 'translation', portuguese: 'Eu sou', english: 'I am', options: ['I', 'am'] },
                 { type: 'pair-match', pairs: [{ english: 'You are', portuguese: 'Você é' }, { english: 'He is', portuguese: 'Ele é' }, { english: 'She is', portuguese: 'Ela é' }, { english: 'We are', portuguese: 'Nós somos' }] },
                 { type: 'image-select', word: 'the teacher', options: ['teacher.png', 'boy.png'], correctOption: 'teacher.png' },
                 { type: 'repetition', phrase: 'She is happy' },
                 { type: 'translation', portuguese: 'Nós somos amigos', english: 'We are friends', options: ['We', 'are', 'friends'] }
              ]
            }
          ]
        },
        // Novas Unidades 6-10
        {
          id: 'unit-6',
          title: 'Unidade 6: Rotina Diária',
          guide: 'Aprenda vocabulário e frases para descrever sua rotina diária e atividades comuns.',
          lessons: [
            {
              id: 'lesson-6-1',
              type: 'vocabulary',
              exercises: [
                { type: 'translation', portuguese: 'Eu acordo cedo', english: 'I wake up early', options: ['I', 'wake', 'up', 'early'] },
                { type: 'pair-match', pairs: [{ english: 'Breakfast', portuguese: 'Café da manhã' }, { english: 'Lunch', portuguese: 'Almoço' }, { english: 'Dinner', portuguese: 'Jantar' }, { english: 'Work', portuguese: 'Trabalho' }] },
                { type: 'image-select', word: 'the window', options: ['window.png', 'boy.png'], correctOption: 'window.png' },
                { type: 'repetition', phrase: 'I brush my teeth' },
                { type: 'translation', portuguese: 'Eu vou para a escola', english: 'I go to school', options: ['I', 'go', 'to', 'school'] }
              ]
            }
          ]
        },
        {
          id: 'unit-7',
          title: 'Unidade 7: Hobbies e Interesses',
          guide: 'Descubra como falar sobre seus hobbies, paixões e o que você gosta de fazer no tempo livre.',
          lessons: [
            {
              id: 'lesson-7-1',
              type: 'vocabulary',
              exercises: [
                { type: 'translation', portuguese: 'Eu gosto de ler', english: 'I like to read', options: ['I', 'like', 'to', 'read'] },
                { type: 'pair-match', pairs: [{ english: 'Music', portuguese: 'Música' }, { english: 'Sports', portuguese: 'Esportes' }, { english: 'Movies', portuguese: 'Filmes' }, { english: 'Books', portuguese: 'Livros' }] },
                { type: 'image-select', word: 'the file', options: ['file.png', 'girl.png'], correctOption: 'file.png' },
                { type: 'repetition', phrase: 'My hobby is playing guitar' },
                { type: 'translation', portuguese: 'Nós assistimos TV', english: 'We watch TV', options: ['We', 'watch', 'TV'] }
              ]
            }
          ]
        },
        {
          id: 'unit-8',
          title: 'Unidade 8: Descrições e Aparência',
          guide: 'Aprenda a descrever pessoas e coisas, usando adjetivos para aparência e características.',
          lessons: [
            {
              id: 'lesson-8-1',
              type: 'vocabulary',
              exercises: [
                { type: 'translation', portuguese: 'Ela é bonita', english: 'She is beautiful', options: ['She', 'is', 'beautiful'] },
                { type: 'pair-match', pairs: [{ english: 'Tall', portuguese: 'Alto' }, { english: 'Short', portuguese: 'Baixo' }, { english: 'Happy', portuguese: 'Feliz' }, { english: 'Sad', portuguese: 'Triste' }] },
                { type: 'image-select', word: 'the globe', options: ['globe.png', 'boy.png'], correctOption: 'globe.png' }, 
                { type: 'repetition', phrase: 'He has blue eyes' },
                { type: 'translation', portuguese: 'Ele é muito inteligente', english: 'He is very smart', options: ['He', 'is', 'very', 'smart'] }
              ]
            }
          ]
        },
        {
          id: 'unit-9',
          title: 'Unidade 9: Direções e Localizações',
          guide: 'Frases essenciais para pedir e dar direções, e descrever onde as coisas estão.',
          lessons: [
            {
              id: 'lesson-9-1',
              type: 'vocabulary',
              exercises: [
                { type: 'translation', portuguese: 'Onde fica o banheiro?', english: 'Where is the bathroom?', options: ['Where', 'is', 'the', 'bathroom', '?'] },
                { type: 'pair-match', pairs: [{ english: 'Left', portuguese: 'Esquerda' }, { english: 'Right', portuguese: 'Direita' }, { english: 'Straight', portuguese: 'Em frente' }, { english: 'Near', portuguese: 'Perto' }] },
                { type: 'image-select', word: 'the next', options: ['next.png', 'car.png'], correctOption: 'next.png' }, 
                { type: 'repetition', phrase: 'Go straight ahead' },
                { type: 'translation', portuguese: 'Vire à direita', english: 'Turn right', options: ['Turn', 'right'] }
              ]
            }
          ]
        },
        {
          id: 'unit-10',
          title: 'Unidade 10: Compras e Pagamentos',
          guide: 'Vocabulário e frases para fazer compras, perguntar preços e realizar pagamentos.',
          lessons: [
            {
              id: 'lesson-10-1',
              type: 'vocabulary',
              exercises: [
                { type: 'translation', portuguese: 'Quanto custa?', english: 'How much does it cost?', options: ['How', 'much', 'does', 'it', 'cost', '?'] },
                { type: 'pair-match', pairs: [{ english: 'Price', portuguese: 'Preço' }, { english: 'Money', portuguese: 'Dinheiro' }, { english: 'Credit Card', portuguese: 'Cartão de crédito' }, { english: 'Cash', portuguese: 'Dinheiro' }] },
                { type: 'image-select', word: 'the vercel', options: ['vercel.png', 'food.png'], correctOption: 'vercel.png' }, 
                { type: 'repetition', phrase: 'I want to buy this' },
                { type: 'translation', portuguese: 'Posso pagar com cartão?', english: 'Can I pay with card?', options: ['Can', 'I', 'pay', 'with', 'card', '?'] }
              ]
            }
          ]
        }
      ]
    }
  ]
};