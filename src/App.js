import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import JobList from './pages/JobList';
import JobDetails from './pages/JobDetails';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<JobList />}></Route>
        <Route path='/jobs/:id' element={<JobDetails />}></Route>
      </Routes>
    </Router>
  );
}


export default App;
