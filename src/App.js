import React ,{useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from'axios';


import Students from './components/Students';
import Admin from './components/Admin';
import Jobs from './components/Jobs';
import CreateJobs from './components/CreateJobs';
import CreateStudent from './components/CreateStudent';
import 'bootstrap/dist/css/bootstrap.min.css';


export const apiurl="https://placementshubapp.herokuapp.com";
export const jobContext=React.createContext();


function App() {

  let [data, setData] = useState([])

  let getData= async()=>{
    let d=await axios.get(`${apiurl}/jobs`)
    setData(d.data.data)
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <Router>
      <jobContext.Provider value={{data}}>
        <Switch>
        <Route path="/admin/:id" component={Jobs }/>
        <Route path="/admin" component={Admin}/>
        <Route path="/create-job" component={CreateJobs} />
        <Route path="/create-student" component={CreateStudent}/>
        <Route path="/:id" component={Students}/>
        </Switch>
      </jobContext.Provider>
    </Router>
  );
}

export default App;
