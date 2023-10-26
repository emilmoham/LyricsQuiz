import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const EndModal = (props) => {
  const {
    showModal,
    onCloseModal,
    startTimestamp,
    endTimestamp,
    currentScore,
    maxPossibleScore,
    title,
    resetQuiz
  } = props;

  const navigate = useNavigate();

  const calculateTotalGameTime = () => {
    let totalGameSeconds = 0;
    if (startTimestamp !== null && endTimestamp !== null) {
      totalGameSeconds = Math.floor((endTimestamp - startTimestamp) / 1000);
    }
    const seconds = totalGameSeconds % 60;
    const minutes = Math.floor(totalGameSeconds / 60);
    return {
      totalGameSeconds,
      minutes,
      seconds
    };
  };

  const getTimeString = () => {
    const elapsedTime = calculateTotalGameTime();
    return `${elapsedTime.minutes}:${elapsedTime.seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const renderElapsedGameTime = () => {
    return <h3>{getTimeString()}</h3>;
  };

  const getScoreString = () => {
    return `${currentScore}/${maxPossibleScore}`;
  };

  const getCurrentUrl = () => {
    const url = window.location.href;
    return url;
  };

  const onClickNewSong = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const onClickRetry = (e) => {
    e.preventDefault();
    resetQuiz();
  };

  const onClickShare = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(
      `🎶 ${title} - ${getScoreString()} in ${getTimeString()} 🎶\n${getCurrentUrl()}`
    );
  };

  return (
    <ReactModal
      isOpen={showModal}
      ariaHideApp={false}
      overlayClassName={'modal-overlay'}
      className={'modal-container'}
    >
      <button className={'close-modal-button'} onClick={onCloseModal}>
        X
      </button>
      <h1>Final Score:</h1>
      <h3>{getScoreString()}</h3>
      <div>in</div>
      {renderElapsedGameTime()}
      <div className='spacer'></div>
      <button className='menu-button share-button' onClick={onClickShare}>
        Copy Results
      </button>
      <div className='end-navigation'>
        <button className='menu-button end-control' onClick={onClickNewSong}>
          New Song
        </button>
        <button className='menu-button end-control' onClick={onClickRetry}>
          Retry
        </button>
      </div>
    </ReactModal>
  );
};

EndModal.propTypes = {
  showModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  startTimestamp: PropTypes.objectOf(Date),
  endTimestamp: PropTypes.objectOf(Date),
  currentScore: PropTypes.number,
  maxPossibleScore: PropTypes.number,
  title: PropTypes.string,
  resetQuiz: PropTypes.func
};

export default EndModal;
