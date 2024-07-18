import React, { useState, useEffect } from 'react';
import axiosInstance from '@lib/axios';
import { useRouter } from 'next/router';

interface GearData {
  name: string;
  chainring: string;
  cog: string;
}

const EditGear = () => {
  const [gearData, setGearData] = useState<GearData>({
    name: '',
    chainring: '',
    cog: '',
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/gears/${id}`)
        .then((response) => {
          setGearData({
            name: response.data.name,
            chainring: response.data.chainring,
            cog: response.data.cog,
          });
        })
        .catch((error) => {
          console.error('Error fetching gear:', error);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const isNumericField = id === 'chainring' || id === 'cog';
    const isValidNumericValue = /^\d*\.?\d*$/.test(value) || value === '';

    if (!isNumericField || isValidNumericValue) {
      setGearData((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const toNumberOrNull = (value: string) =>
      value === '' ? null : parseFloat(value);

    const submittedData = {
      ...gearData,
      chainring: toNumberOrNull(gearData.chainring),
      cog: toNumberOrNull(gearData.cog),
    };

    try {
      await axiosInstance.put(`/gears/${id}`, { api_v1_gear: submittedData });
      router.push('/gears');
    } catch (error) {
      console.error('There was an error updating the gear!', error);
    }
  };

  return (
    <div>
      <h1>Edit Gear</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={gearData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="chainring">Chainring:</label>
          <input
            type="text"
            id="chainring"
            value={gearData.chainring}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cog">Cog:</label>
          <input
            type="text"
            id="cog"
            value={gearData.cog}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Gear</button>
      </form>
    </div>
  );
};

export default EditGear;
