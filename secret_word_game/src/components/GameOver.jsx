import './GameOver.css';
import PropTypes from 'prop-types';

const GameOver = ({ retry, score }) => {
  return (
    <div className='final-component'>
      <h1>Fim do jogo!</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retry}>Recomeçar o jogo</button>
    </div>
  );
};

GameOver.propTypes = {
  retry: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default GameOver;
