import React, { useEffect, useState } from 'react';

import Timer from './Timer';

const QuizHeader = (props) => {
    const {
        gameData,
        allotedGameTime,
        onTimerExpire
    } = props;

    const setTimer = () => {
        let d = new Date();
        d.setSeconds(d.getSeconds() + (allotedGameTime ? allotedGameTime : 15));
        return d;
      }

    return (
    <div className='quiz-header'>
        <Timer expiryTimestamp={setTimer()} onEnd={onTimerExpire} />
        <h1 className='song-title'>{gameData.title}</h1>
        <h3 className='header-side-content score'>{gameData.currentScore}/{gameData.maxPossibleScore}</h3>
    </div>
    );
}

export default QuizHeader;