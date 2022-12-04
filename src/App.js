import './App.css';
import { DataProvider } from './DataProvider';
import { NavBar } from './components/NavBar'
import { Visualizer } from './components/Visualizer'

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
