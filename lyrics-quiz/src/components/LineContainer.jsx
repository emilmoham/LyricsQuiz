import React, { useEffect, useState } from "react";
import { isGeniusSectionHeader, isAlphaNumeric, isNotAlphaNumeric } from "../constants";

const LineContainer = (props) => {
    const {
        line,
        revealedWords,
    } = props;

    const [words, setWords] = useState([]);

    useEffect(() => {
        let words = [];

        // TODO: This logic should be moved up to the app class or something
        if (line.match(isGeniusSectionHeader) !== null) {
            words.push({
                revealedText: line,
                hiddenText: line,
                logicalText: line
            });
        } else {
            let inputWords = line.split(' ');
            for(let i = 0; i < inputWords.length; i++) {
                const input = inputWords[i];
                let word = {}
                
                word.revealedText = input;
                word.hiddenText = input.replace(isAlphaNumeric, '_');
                word.logicalText = input.toLowerCase().replace(isNotAlphaNumeric, '');

                words.push(word);
            }
        }

        setWords(words);
    }, [line]);

    const renderLine = () => {
        
        let outstr = "";
        for(let i = 0; i < words.length; i++) {
            const word = words[i];
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