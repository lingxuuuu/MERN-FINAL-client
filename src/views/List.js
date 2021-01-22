import { Link } from '@reach/router'
import axios from 'axios'
import e from 'cors'
import React, { useEffect, useState } from 'react'

function List({pirates, deletePirate}) {
//pirates={pirates} from App.js

    const deleteAPI = (id) => {
        axios.delete(`http://localhost:8000/pirates/delete/${id}`) //delete from db
            .then( res => deletePirate(id) ) //delete from local state
            .catch( err => console.log(err) )

    }

    return (
        <div>
             <h1>Pirate Crew</h1>
             <button><Link to={'/pirate/new'}>Add Pirate</Link></button> 
             {
                 pirates.map((pirate, idx)=>
                 <div key={idx}>
                   <h3>{pirate.name}</h3>
                   <img src={pirate.image} width="300" height="200" alt="image" />
                   <button><Link to={`/pirate/${pirate._id}`}>View Pirate</Link></button> |
                  | <button onClick={e=>deleteAPI(pirate._id)}>Walk the Plank</button>
                 </div>
                 )
             }
        </div>
    )
}

export default List
