import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const EndModal = (props) => {
    const {
        isGameOver,
        gameData,
        el
    } = props;

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(isGameOver);
    }, [isGameOver])

    const closeModal = (e) => {
        console.log('closing');
        setShowModal(false);
    }

    return (
    <ReactModal 
        isOpen={showModal} 
        appElement={el}>
        <h1>Final Score:</h1>
        <p>{gameData.currentScore}/{gameData.maxPossibleScore}</p>
        <button onClick={closeModal}>Close</button>
    </ReactModal>
    );
}

export default EndModal;