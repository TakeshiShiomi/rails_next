import React, { useEffect, useState } from 'react';
import axiosInstance from '@lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Gear {
  id: number;
  name: string;
  cog: number;
  chainring: number;
}

const GearsIndex = () => {
  const [gears, setGears] = useState<Gear[]>([]);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get('/gears')
      .then((response) => {
        setGears(response.data);
      })
      .catch((error) => {
        console.error('Error fetching gears:', error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm('この投稿を削除しますか？');
    if (isConfirmed) {
      try {
        await axiosInstance.delete(`/gears/${id}`);
        setGears(gears.filter((gear) => gear.id !== id));
      } catch (error) {
        console.error('Error deleting gear:', error);
      }
    }
  };

  return (
    <div>
      <h1>Gears</h1>
      <Link href="/gears/new">Create New Gear</Link>
      <ul>
        {gears.map((gear) => (
          <li key={gear.id}>
            <Link href={`/gears/${gear.id}`}>{gear.name}</Link>{' '}
            <p>Cog: {gear.cog}</p>
            <p>Chainring: {gear.chainring}</p>
            <button onClick={() => router.push(`/gears/${gear.id}/edit`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(gear.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GearsIndex;
