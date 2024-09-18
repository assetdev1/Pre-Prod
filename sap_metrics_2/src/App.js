import './App.css';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RightSide/RightSide';
import Sidebar from './components/Sidebar/Sidebar';
import Snapshot from './components/Snapshot/Snapshot';
import Users from './components/Users/Users'; 
import Overview from './components/Overview/Overview'; 
import Trends from './components/Trends/Trends';
import Test from './components/Test/Test';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <div className="AppGlass">
          <Sidebar />
          <Routes>
            <Route path="/" element={
              <>
              <MainDash />
              <RightSide />
              </>
            } />
            <Route path="/snapshot" element={<Snapshot/>} />
            <Route path="/users" element={<Users/>} />
            <Route path="/overview" element={<Overview/>} />
            <Route path="/trends" element={<Trends/>} />
            <Route path="/test" element={<Test/>} />
          </Routes>
        </div>
      </div>
    </Router>  
  );

}

export default App;
