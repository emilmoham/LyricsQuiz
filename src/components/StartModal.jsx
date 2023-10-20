import React from 'react';
import ReactModal from 'react-modal';

const StartModal = (props) => {
  const { gameData, showModal, startGame } = props;

  return (
    <ReactModal isOpen={showModal} ariaHideApp={false} overlayClassName={'modal-overlay'} className={'modal-container'}>
      <button disabled={gameData.lyrics.length === 0} className='menu-button' onClick={startGame}>
        Start Quiz
      </button>
    </ReactModal>
  );
};

export default StartModal;
