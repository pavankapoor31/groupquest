import logo from './logo.svg';
import './App.css';
import RouteManager from './routes';
import 'bootstrap/dist/css/bootstrap.css';
import Toast from './components/Toast/Toast';


function App() {
  return (
    <div className="">
      <RouteManager/>
      {/* <Toast/> */}
    </div>
  );
}

export default App;
