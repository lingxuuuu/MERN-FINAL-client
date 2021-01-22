import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Pirate({id}) {

    const [pirate, setPirate] = useState({});


    useEffect  ( () => {
        axios.get(`http://localhost:8000/pirates/${id}`)
            .then( res => {
                setPirate(res.data)
            })
            .catch( err => console.log(err))
      }, []);

    return (
        <div>
             <h1>{pirate.name}</h1>
             <img src={pirate.image} alt="image" width="600" height="400" />
             <h4>{pirate.phrase}</h4>
             <h3>About</h3>
             <p>Position: {pirate.crewPosition}</p>
             <p>Treasures: {pirate.chest}</p>
             <p>Peg Leg: {pirate.pegLeg ? 'yes': 'No'}</p>
             <p>Eye Patch: {pirate.eyePatch ? 'yes': 'No'}</p>
             <p>Hook Hand: {pirate.hookHand ? 'yes': 'No'}</p>
        </div>
    )
}

export default Pirate
