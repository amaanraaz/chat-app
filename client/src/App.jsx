import { useEffect, useMemo, useState } from 'react';
import './App.css';
import {io} from 'socket.io-client';

function App() {
  const [message,setMessage] = useState("");
  const socket = useMemo(()=> io("http://localhost:3000/"), []);

  useEffect(()=>{
    socket.on('connect',()=>{
      console.log('conneted to client');
    });
    // welcome even created 
    socket.on('welcome',(textFromServer)=>{
      console.log(textFromServer);
    });

    socket.on('receive-message',(data)=>{
      console.log(data);
    })

    return ()=>{
      socket.disconnect();
    }
  },[]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    socket.emit('message', message);
    setMessage("");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea value={message} onChange={(e)=>(setMessage(e.target.value))}></textarea>
        <button type='submit'>submit</button>
      </form>
    </>
  )
}

export default App
