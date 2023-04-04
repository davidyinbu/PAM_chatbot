import ChatBot from 'react-simple-chatbot';
import Rules from './components/chatbot/Rules';
import './App.css';

function App() {
  //   console.log(token);
  return (
    <div className="App">
      <h1>Welcome to PAM</h1>
      <Rules customDelay={0} />
    </div>
  );
}

export default App;
