import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '@lib/axios';

interface Gear {
  id: number;
  name: string;
  cog: number;
  chainring: number;
}

const GearPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [gear, setGear] = useState<Gear | null>(null);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/gears/${id}`)
        .then((response) => {
          setGear(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the gear!', error);
        });
    }
  }, [id]);

  if (!gear) return <div>Loading...</div>;

  return (
    <div>
      <h1>id: {gear.id}</h1>
      <h2>name: {gear.name}</h2>
      <p>cog: {gear.cog}</p>
      <p>chainring: {gear.chainring}</p>
    </div>
  );
};

export default GearPage;
