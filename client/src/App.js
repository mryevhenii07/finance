import { Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';

import { addFinance } from './store/slice/financeSlice';
import Cart from './component/Pages/Cart/Cart';
import Home from './component/Pages/Home/Home';
import NotFound from './component/Pages/NotFound/NotFound';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const socket = io('http://localhost:4000');
  socket.emit('start');
  socket.on('ticker', (data) => {
    dispatch(addFinance(data));
    // data.map((el) => dispatch(cardPrice(el.price)));
    // data.map((el) => dispatch(cardChange(el.change)));
  });
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:ticker" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
