import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const StartModal = (props) => {
  const { isQuizLoaded, showModal, startGame } = props;

  return (
    <ReactModal
      isOpen={showModal}
      ariaHideApp={false}
      overlayClassName={'modal-overlay'}
      className={'modal-container'}
    >
      <button
        disabled={!isQuizLoaded}
        className='menu-button'
        onClick={startGame}
      >
        Start Quiz
      </button>
    </ReactModal>
  );
};

StartModal.propTypes = {
  showModal: PropTypes.bool,
  isQuizLoaded: PropTypes.bool,
  startGame: PropTypes.func
};

export default StartModal;
