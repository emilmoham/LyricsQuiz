import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

import './EndModal.css';

const EndModal = (props) => {
    const {
        isGameOver,
        gameData,
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
        ariaHideApp={false}
        overlayClassName={'modal-overlay'}
        className={'modal-container'}>
        <button className={'close-modal-button'} onClick={closeModal}>X</button>
        <h1>Final Score:</h1>
        <h3>{gameData.currentScore}/{gameData.maxPossibleScore}</h3>
        <div className='spacer'></div>
        <button className='share-button'>Share</button>
        <div className='end-navigation'>
            <button>New</button>
            <button>Retry</button>
        </div>
    </ReactModal>
    );
}

export default EndModal;