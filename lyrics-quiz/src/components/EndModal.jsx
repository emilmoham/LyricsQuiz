import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const EndModal = (props) => {
    const {
        isGameOver,
        revealedWords,
        el
    } = props;

    const [showModal, setShowModal] = useState(false);

    const countRevealedWords = (revealedWordsMap) => {
        if (revealedWordsMap === undefined)
            return 0;
        let count = 0;
        for (const [key, value] of revealedWordsMap) {
            if (value) {
                count++;
            }
        }
        return count;
    }

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
        <p>{countRevealedWords(revealedWords)}/{revealedWords.size}</p>
        <button onClick={closeModal}>Close</button>
    </ReactModal>
    );
}

export default EndModal;