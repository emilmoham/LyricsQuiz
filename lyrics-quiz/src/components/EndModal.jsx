import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const EndModal = (props) => {
    const {
        gameData,
        showModal,
        onCloseModal
    } = props;

    const calculateTotalGameTime = () => {
        let totalGameSeconds = 0;
        if (gameData.startTimestamp !== null && gameData.endTimestamp !== null)
            totalGameSeconds =  Math.floor((gameData.endTimestamp - gameData.startTimestamp) / 1000);
        const seconds = totalGameSeconds % 60;
        const minutes = Math.floor(totalGameSeconds / 60);
        return {totalGameSeconds: totalGameSeconds, minutes: minutes, seconds: seconds}
    }

    const renderElapsedGameTime = () => {
        const elapsedTime = calculateTotalGameTime();
        return <h3>{elapsedTime.minutes}:{elapsedTime.seconds.toString().padStart(2,'0')}</h3> 
    }

    return (
    <ReactModal 
        isOpen={showModal} 
        ariaHideApp={false}
        overlayClassName={'modal-overlay'}
        className={'modal-container'}>
        <button className={'close-modal-button'} onClick={onCloseModal}>X</button>
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