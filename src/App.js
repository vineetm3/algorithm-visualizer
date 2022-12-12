import './App.css';
import { DataProvider } from './DataProvider';
import { NavBar } from './components/NavBar'
import { Visualizer } from './components/Visualizer'

//Believe having DataProvider here gives us the power to use its contents in NavBar + Visualizer 
function App() {
  return (
    <DataProvider>
      <div className="App">
        <NavBar/>
        <Visualizer/>
      </div>
    </DataProvider>
  );
}

export default App;
