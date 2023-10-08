import React, { useEffect, useState } from "react";

const LineContainer = (props) => {
    const {
        line,
        revealedWords,
    } = props;

    const renderLine = () => {
        
        let outstr = "";
        for(let i = 0; i < line.words.length; i++) {
            const word = line.words[i];
            if (revealedWords.get(word.logicalText)) {
                outstr += word.revealedText;
            } else {
                outstr += word.hiddenText;
            }
            outstr += ' ';
        }
        return <p>{outstr}</p>;
    }

    return (
        <div className="line">{renderLine()}</div>
    );
}

export default LineContainer;