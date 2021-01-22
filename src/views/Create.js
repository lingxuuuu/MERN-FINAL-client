import { Link, navigate } from '@reach/router'
import axios from 'axios';
import React, { useState } from 'react';

function Create({addPirate}) {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [chest, setChest] = useState();
    const [phrase, setPhrase] = useState('');
    const [crewPosition, setCrewPosition] = useState('');
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);

    const [errorMessages, setErrorMessages] = useState([]);

    const onClickHandler = (e) => {
        e.preventDefault();

        const newPirate ={
            name : name,
            image:image,
            chest:chest,
            phrase:phrase,
            crewPosition:crewPosition,
            pegLeg:pegLeg,
            eyePatch:eyePatch,
            hookHand:hookHand
        }

        axios.post('http://localhost:8000/pirates/create', newPirate)
             .then(res => {
                 addPirate(res.data)
                 navigate('/pirates')
             })
             .catch(err => {
                const {errors} = err.response.data //get the errors object
                const messages = Object.keys(errors).map(error =>errors[error].message)
                //$$$$pull out the keys, map the keys, take each error that we find, only return the error message$$$$
                setErrorMessages(messages);
             })
    };

    return (
        <div>
            <h1>Add Pirate</h1>
            <Link to={'/pirates'}>Crew Board</Link>
            {
                errorMessages.map( (message, i) => 
                <p style={{color: 'red'}} key ={i}> {message} </p>
                )
            }
            <p>
                <label>First Name</label>
                <input
                    type="text"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                ></input>
            </p>
            <p>
                <label>Image Url</label>
                <input
                    type="text"
                    value={image}
                    name="image"
                    onChange={(e) => setImage(e.target.value)}
                ></input>
            </p>
            <p>
                <label># of Treasure Chests</label>
                <input
                    type="number"
                    value={chest}
                    name="chest"
                    onChange={(e) => setChest(e.target.value)}
                ></input>
            </p>
            <p>
                <label>Pirate Catch Phrase</label>
                <input
                    type="text"
                    value={phrase}
                    name="phrase"
                    onChange={(e) => setPhrase(e.target.value)}
                ></input>
            </p>
            <select value={crewPosition} onChange={(e) => setCrewPosition(e.target.value)}>
                <option>Select Position</option>
                <option value="captain">Captain</option>
                <option value="firstMaster">First Master</option>
                <option value="quaterMaster">Quater Master</option>
                <option value="ooatswain">Boatswain</option>
                <option value="powerMonkey">Power Monkey</option>
            </select>
            <p>
                <label> Peg Leg </label>
                <input name="pegLeg" type="checkbox" onChange={(e) => setPegLeg(e.target.checked)}/>
            </p>
            <p>
                <label> Eye patch </label>
                <input name="eyePatch" type="checkbox" onChange={(e) => setEyePatch(e.target.checked)}/>
            </p>
            <p>
                <label> Hook Hand </label>
                <input name="hookHand" type="checkbox" onChange={(e) => setHookHand(e.target.checked)}/>
            </p>
            <p>
                <button onClick={onClickHandler}>Add Pirate</button>
            </p>
        
        </div>
    )
}

export default Create
