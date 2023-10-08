import React, { useEffect, useState } from 'react';

import Timer from './Timer';

const QuizHeader = (props) => {
    const {
        songTitle,
        revealedWords,
        onTimerExpire
    } = props;

    const [score, setScore] = useState(0);

    const countRevealedWords = (revealedWordsMap) => {
        let count = 0;
        for (const [key, value] of revealedWordsMap) {
            if (value) {
                count++;
            }
        }
        return count;
    }

    const setTimer = () => {
        let d = new Date();
        d.setSeconds(d.getSeconds() + 15);
        return d;
      }

    useEffect(() => {
        setScore(countRevealedWords(revealedWords))
    }, [revealedWords])

    return (
    <div className='quiz-header'>
        <Timer expiryTimestamp={setTimer()} onEnd={onTimerExpire} />
        <h1 className='song-title'>{songTitle}</h1>
        <h3 className='score'>{score}/{revealedWords.size}</h3>
    </div>
    );
}

export default QuizHeader;