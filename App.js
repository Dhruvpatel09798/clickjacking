import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState('');

    const checkClickjacking = () => {
        socket.emit('check clickjacking', url);
    };

    socket.on('clickjacking result', ({ url, isVulnerable }) => {
        setResult(isVulnerable ? `Website ${url} is vulnerable to Clickjacking!` : `Website ${url} is not vulnerable to Clickjacking.`);
    });

    return (
        <div>
            <h1>Clickjacking Vulnerability Checker</h1>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter website URL" />
            <button onClick={checkClickjacking}>Check Vulnerability</button>
            {result && <p>{result}</p>}
        </div>
    );
}

export default App;
