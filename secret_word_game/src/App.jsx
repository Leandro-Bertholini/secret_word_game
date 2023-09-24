// CSS
import './App.css'

// react
import { useCallback, useEffect, useState } from 'react';

// data
import { wordsList } from './data/words';

// componentes importados
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  
  // Palavra escolhida
  const [pickedWord, setPickedWord] = useState("");

  const [gameInProgress, setGameInProgress] = useState(false);

  // Para a renderização da mensagem de acerto
  const [showCongratulations, setShowCongratulations] = useState(false);
  
  // Categoria escolhida
  const [pickedCategory, setPickedCategory] = useState("");

  // Lista de Letras
  const [letters, setLetters] = useState([]);

  // letras advinhadas
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Letras erradas
  const [wrongLetters, setWrongLetters] = useState([]);

  // Tentativas do usuário
  const [guesses, setGuesses] = useState(3);

  // Pontuação do usuário por acerto de palavra(100)
  const [score, setScore] = useState(0)


  const pickWordAndPickCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category)

    const word = 
      words[category][Math.floor(Math.random() * words[category].length)]

      console.log(word)

      return { word, category };
  }, [words]);

  const startGame = useCallback(() => {

    setShowCongratulations(false);

    clearLetterStates();

    const { word, category } = pickWordAndPickCategory();

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    console.log(word, category)

    console.log(wordLetters);

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameInProgress(true);

    setGameStage(stages[1].name);
  }, [pickWordAndPickCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    
    // Se a letra atual digitada já foi utilizada (para não perder a chance)
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses -1)
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // Mudança de estágio do jogo para game over(Tentativas acabaram)
  useEffect(() => {

    if(guesses <= 0) {
      clearLetterStates();
      
      setGameStage(stages[2].name);
    }

  }, [guesses]);

  // Condição de vitória 
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)];

    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      setScore((actualScore) => actualScore += 100)

      setShowCongratulations(true);

      setTimeout(() => {
      startGame();
      }, 3000);
    }
  }, [guessedLetters, letters, startGame]);


  // restarts the game (reinicia todos estado do jogo)
  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameInProgress(false); 

    setGameStage(stages[0].name)
  };




  return (
   <div className='App'>
     {gameStage === 'start' && (
        <StartScreen
        startGame={startGame}
        gameInProgress={gameInProgress}
        />
     )}
     {gameStage === 'game' && (
        <Game 
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          showCongratulations={showCongratulations}
        />
     )}
     {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
   </div>
  );
}

export default App
