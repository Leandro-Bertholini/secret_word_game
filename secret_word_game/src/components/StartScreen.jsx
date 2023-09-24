import "./StartScreen.css";
import PropTypes from 'prop-types';

const StartScreen = ({ startGame, gameInProgress }) => {
  return (
    <div className="start">
      <h1>Secret Word</h1>
      <h2 className="welcome-message">Bem-vindo ao jogo!</h2>
      <p>Click no botão para jogar</p>
      {!gameInProgress && (
        <button onClick={ startGame }>Começar o jogo</button>
      )}
    </div>
  );
}

StartScreen.propTypes = {
  startGame: PropTypes.func.isRequired,
  gameInProgress: PropTypes.bool.isRequired,
};

export default StartScreen;
