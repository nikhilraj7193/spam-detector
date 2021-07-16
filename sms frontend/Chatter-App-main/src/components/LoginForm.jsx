import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': "10445534-bff0-43c9-b0df-2ff8bd9c947b", 'User-Name': username, 'User-Secret': password };

        try {
            
             axios.get('https://api.chatengine.io/chats', { headers: authObject });

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
        } catch (error) {
            //error -> try with new username
            setError('Oops Incorrect Credentials.')

        }


    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title" >SMS APP </h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Log IN</span>
                        </button>
                    </div>
                    <h2 className="error"> { error}</h2>
                </form>
            </div>
        </div>


    );
};
export default LoginForm;