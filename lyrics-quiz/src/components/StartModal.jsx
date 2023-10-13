import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const StartModal = (props) => {
    const {
        gameData,
        startGame
    } = props;

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(gameData.startTimestamp === null);
    }, [gameData.startTimestamp])

    const onClickStart = () => {
        startGame();
    }

    return (
    <ReactModal 
        isOpen={showModal} 
        ariaHideApp={false}
        overlayClassName={'modal-overlay'}
        className={'modal-container'}>
        <button className='menu-button' onClick={startGame}>Start Quiz</button>
    </ReactModal>
    );
}

export default StartModal;