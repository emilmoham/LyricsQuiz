import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');

    const onClickBegin = () => {
        let sanitizedInput = inputValue.split('genius.com/')[1];
        console.log(sanitizedInput);
        navigate(`/${sanitizedInput}`)
    }

    return (
    <div className='home-main-container' >
        <h3>Copy the URL for a song on <a href="https://www.genius.com" target='_blank' rel="noreferrer">Genius.com</a></h3>
        <input 
        placeholder='Paste the genius url here'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={onClickBegin}>Begin your quiz</button>
    </div>)
}

export default Home;