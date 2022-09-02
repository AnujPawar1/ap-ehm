import React, { useState, useEffect } from 'react';
import './App.css';
import { API , Storage} from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import logo from './logo.svg';

import ReactDOM from 'react-dom/client';


const initialFormState = { AssetNumber: '', AssetName: '', AssetType:'' }

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  
  async function fetchNotes() {
    try {
      const response = await fetch('https://caefabv1e0.execute-api.us-east-1.amazonaws.com/dev/assets', {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      if (!response.ok) {
        alert("Response code - " + response.ok);
      }
      const result = await response.json();
      alert("Result-" + result);
      
    } catch (err) {
      alert("Error - " + err);
    }


  }


  return (
    <div className="App">    
       
        <p id="assetdata"> test </p>
       
       <button onClick={apidata => {fetchNotes();}}> Get Asset Data </button>


           
       <Authenticator>
       {({ signOut, user }) => (
         <main>  
            <div>                  
            {
              notes.map(note => ( <div key={note.AssetNumber}>   <h1>Hello Anuj {user.username}</h1> <h2>{note.AssetNumber}</h2>  <p>{note.AssetName}</p>   <p>{note.AssetType}</p>  </div> ))       
            }
            </div>  
           <button onClick={signOut}>Sign out</button>
         </main>
        )}
      </Authenticator>
    </div>

  );
}

function Hello(props) {
  return <h1>Hello World!</h1>;
}

export default withAuthenticator(App);