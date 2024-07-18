import React, { useEffect, useState } from 'react';
import axiosInstance from '@lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Wheel {
  id: number;
  name: string;
  rim: number;
  tire: number;
}

const WheelsIndex = () => {
  const [wheels, setWheels] = useState<Wheel[]>([]);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get('/wheels')
      .then((response) => {
        setWheels(response.data);
      })
      .catch((error) => {
        console.error('Error fetching wheels:', error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm('この投稿を削除しますか？');
    if (isConfirmed) {
      try {
        await axiosInstance.delete(`/wheels/${id}`);
        setWheels(wheels.filter((wheel) => wheel.id !== id));
      } catch (error) {
        console.error('Error deleting wheel:', error);
      }
    }
  };

  return (
    <div>
      <h1>Wheels</h1>
      <Link href="/wheels/new">Create New Wheel</Link>
      <ul>
        {wheels.map((wheel) => (
          <li key={wheel.id}>
            <Link href={`/wheels/${wheel.id}`}>{wheel.name}</Link>{' '}
            <p>tire: {wheel.tire}</p>
            <p>rim: {wheel.rim}</p>
            <button onClick={() => router.push(`/wheels/${wheel.id}/edit`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(wheel.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WheelsIndex;
