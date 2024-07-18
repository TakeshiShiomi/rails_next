import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '@lib/axios';

interface Wheel {
  id: number;
  name: string;
  rim: number;
  tire: number;
}

const WheelPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [wheel, setWheel] = useState<Wheel | null>(null);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/wheels/${id}`)
        .then((response) => {
          setWheel(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the wheel!', error);
        });
    }
  }, [id]);

  if (!wheel) return <div>Loading...</div>;

  return (
    <div>
      <h1>id: {wheel.id}</h1>
      <h2>name: {wheel.name}</h2>
      <p>tire: {wheel.tire}</p>
      <p>rim: {wheel.rim}</p>
    </div>
  );
};

export default WheelPage;
