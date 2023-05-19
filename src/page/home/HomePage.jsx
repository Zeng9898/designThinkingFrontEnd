import styles from '../../styles';
import { Navbar } from "../../components";
import Slogan from "./components/Slogan"
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const HomePage = () => {
  let count = 1;

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log('Socket connected', socket.id);
    });
    socket.on('receive-click-event', count => {
      console.log(count)
    })
    setSocket(socket);
    // Clean up the connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  function testSocketEvent() {
    socket.emit('click-event', count);
  }
  return (
    <div className='bg-gradient-to-r from-blue-400 to-blue-500 overflow-hidden h-screen' onClick={testSocketEvent}>
      <div className={`${styles.paddingX} flex ${styles.flexCenter}`}>
        <div className={`w-full`}>
          <Navbar />
        </div>
      </div>
      <div className={`${styles.flexCenter} `}>
        <div className={`${styles.boxWidth}`}>
          <Slogan />
        </div>
      </div>
    </div>
  )
}

export default HomePage