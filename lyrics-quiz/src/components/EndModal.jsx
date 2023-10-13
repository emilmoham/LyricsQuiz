import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const EndModal = (props) => {
    const {
        gameData,
    } = props;

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(gameData.isGameOver);
    }, [gameData.isGameOver])

    const calculateTotalGameTime = () => {
        const totalGameSeconds =  Math.floor((gameData.endTimestamp - gameData.startTimestamp) / 1000);
        const seconds = totalGameSeconds % 60;
        const minutes = Math.floor(totalGameSeconds / 60);
        return {totalGameSeconds: totalGameSeconds, minutes: minutes, seconds: seconds}
    }

    const renderElapsedGameTime = () => {
        const elapsedTime = calculateTotalGameTime();
        return <h3>{elapsedTime.minutes}:{elapsedTime.seconds}</h3> 
    }
    
    const closeModal = (e) => {
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
        <div>in</div>
        {renderElapsedGameTime()}
        <div className='spacer'></div>
        <button className='menu-button share-button'>Copy Results</button>
        <div className='end-navigation'>
            <button className='menu-button end-control'>New Song</button>
            <button className='menu-button end-control'>Retry</button>
        </div>
    </ReactModal>
    );
}

export default EndModal;