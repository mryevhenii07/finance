import { Link } from 'react-router-dom';
import s from './Cart.module.css';

import Diagram from '../../Diagram/Diagram';

const Cart = () => {
  return (
    <>
      <div className={s.wrapCart}>
        <Diagram />
      </div>
      <Link to="/" className={s.wrapBtn}>
        <button className={s.btn}>Back</button>
      </Link>
    </>
  );
};

export default Cart;
