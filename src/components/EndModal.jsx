import React from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const EndModal = (props) => {
    const {
        gameData,
        showModal,
        onCloseModal
    } = props;

    const navigate = useNavigate();

    const calculateTotalGameTime = () => {
        let totalGameSeconds = 0;
        if (gameData.startTimestamp !== null && gameData.endTimestamp !== null)
            totalGameSeconds =  Math.floor((gameData.endTimestamp - gameData.startTimestamp) / 1000);
        const seconds = totalGameSeconds % 60;
        const minutes = Math.floor(totalGameSeconds / 60);
        return {totalGameSeconds: totalGameSeconds, minutes: minutes, seconds: seconds}
    }

    const getTimeString = () => {
        const elapsedTime = calculateTotalGameTime();
        return `${elapsedTime.minutes}:${elapsedTime.seconds.toString().padStart(2,'0')}`
    }

    const renderElapsedGameTime = () => {
        return <h3>{getTimeString()}</h3> 
    }

    const getScoreString = () => {
        return `${gameData.currentScore}/${gameData.maxPossibleScore}`
    }

    const getCurrentUrl = () => {
        let url = window.location.href;
        url = url.replace('https://','');
        return url;
    }

    const onClickNewSong = (e) => {
        e.preventDefault();
        navigate('/')
    }

    const onClickRetry = (e) => {
        e.preventDefault();
        navigate(0)
    }

    const onClickShare = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(`🎶 ${gameData.title} - ${getScoreString()} in ${getTimeString()} 🎶\n${getCurrentUrl()}`)
    }



    return (
    <ReactModal 
        isOpen={showModal} 
        ariaHideApp={false}
        overlayClassName={'modal-overlay'}
        className={'modal-container'}>
        <button className={'close-modal-button'} onClick={onCloseModal}>X</button>
        <h1>Final Score:</h1>
        <h3>{getScoreString()}</h3>
        <div>in</div>
        {renderElapsedGameTime()}
        <div className='spacer'></div>
        <button className='menu-button share-button' onClick={onClickShare}>Copy Results</button>
        <div className='end-navigation'>
            <button className='menu-button end-control' onClick={onClickNewSong}>New Song</button>
            <button className='menu-button end-control' onClick={onClickRetry}>Retry</button>
        </div>
    </ReactModal>
    );
}

export default EndModal;