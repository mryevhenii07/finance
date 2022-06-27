import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import s from './Home.module.css';
const Home = () => {
  const finances = useSelector((state) => {
    const sharesMap = Object.entries(state.finances.finance);
    return sharesMap.map(([ticker, data]) => {
      const latestData = data[data.length - 1];
      return { ticker, ...latestData };
    });
  });

  return (
    <>
      <ul className={s.wrapBlockFinance}>
        {finances.map(({ ticker, exchange, price, change, change_percent }) => (
          <Link to={`/${ticker}`} className={s.link} key={ticker}>
            <li className={s.item}>
              <h3>{ticker}</h3>
              <span>{exchange}</span>
              <span>{price}</span>
              <span className={s.change}>{change}</span>
              <span>{change_percent}%</span>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Home;
