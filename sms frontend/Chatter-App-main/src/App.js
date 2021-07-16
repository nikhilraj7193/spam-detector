import { ChatEngine } from 'react-chat-engine';
 import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';

import './App.css';

const App = () => {
    if (!localStorage.getItem('username')) return <LoginForm />;


    return (
        <ChatEngine
            height="100vh"
            projectID="10445534-bff0-43c9-b0df-2ff8bd9c947b"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        />

    );
};

export default App;