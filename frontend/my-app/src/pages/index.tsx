import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/gears">Gears</Link>
          </li>
          <li>
            <Link href="/wheels">Wheels</Link>
          </li>
          <li>
            <Link href="/bike_calculate">自転車計算</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
