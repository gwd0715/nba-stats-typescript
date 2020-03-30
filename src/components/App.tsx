import React from 'react';
import TopNavBar from './TopNavBar';
import MainBody from './MainBody';
import '../styles/App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <TopNavBar />
            <MainBody />
        </div>
    );
};

export default App;
