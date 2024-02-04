import logo from './logo.svg';
import RouteManager from './routes';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='root-app'>

      <RouteManager/>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={true} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </div>

  );
}

export default App;
