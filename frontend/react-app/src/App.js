import logo from './logo.svg';
import RouteManager from './routes';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Toast from './components/Toast/Toast';

function App() {
  return (
    <div className='root-app'>

      <RouteManager/>
    </div>

  );
}

export default App;
