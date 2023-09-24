import './Game.css';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';

const Game = ({ 
    verifyLetter,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score,
    showCongratulations,
}) => {
  // Estado para verificar a letra atual digitada 
  const [letter, setLetter] = useState("");

  // referência para assistir o estado
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter); 
  
    setLetter("");

    letterInputRef.current.focus();
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((letter, i) => 
          guessedLetters.includes(letter) ? (
            <span key={i} className='letter'>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      {showCongratulations ? (
        <div className="congratulations">
          <h1>Parabéns!...Você acertou!</h1>
        </div>
      ) : (
        <div className="letterContainer">
          <p>Tente advinhar a letra da palavra:</p>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='letter'
              maxLength="1"
              required
              onChange={(e) => setLetter(e.target.value)} 
              value={letter}
              ref={letterInputRef}
            />
            <button>Jogar!</button>
          </form>
        </div>
      )}
      {!showCongratulations && (
        <div className="wrongLettersContainer">
          <p>Letras já utilizadas:</p>
          {wrongLetters.map((letter, i) => (
            <span key={i}>{letter}, </span>
          ))}
        </div>
      )}
    </div>
  )
}

Game.propTypes = {
  verifyLetter: PropTypes.func.isRequired,
  pickedCategory: PropTypes.string.isRequired,
  letters: PropTypes.array.isRequired,
  guessedLetters: PropTypes.array.isRequired,
  wrongLetters: PropTypes.array.isRequired,
  guesses: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  showCongratulations: PropTypes.bool.isRequired,
};

export default Game;
