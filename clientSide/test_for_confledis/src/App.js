import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from './components/Navbar.component';
import Index from './container';

function App() {
  return (
    <div className="App">
      <NavbarComponent/>
      <Index/>
    </div>
  );
}

export default App;
