import logo from './logo.svg';
import './App.css';
import {Router} from '@reach/router';
import List from './views/List';
import Create from './views/Create';
import Pirate from './views/Pirate';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {

  const [pirates, setPirates] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8000/pirates')
        .then( res => setPirates(res.data))
        .catch( err => console.log(err))
  }, [])

  const addPirate = (pirate) => setPirates([...pirates, pirate])

  const deletePirate = (id) => {
    const changedPirates = pirates.filter((pirate) => {
      if(pirate._id === id){
        return false;
      }
      return true;
    })
    setPirates(changedPirates);
  }


  return (
    <div className="App">
      <Router>
        <List path="/pirates" pirates={pirates} deletePirate={deletePirate}/>
        <Create path="/pirate/new" addPirate={addPirate} />
        <Pirate path="/pirate/:id" />
      </Router>
    </div>
  );
}

export default App;
