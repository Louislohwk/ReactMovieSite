import './App.css';
import Navbar from './components/ui/navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/routes/Router';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
