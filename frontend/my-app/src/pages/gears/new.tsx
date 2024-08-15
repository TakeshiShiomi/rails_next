import React, { useState } from 'react';
import axiosInstance from '@lib/axios';
import { useRouter } from 'next/router';

interface GearData {
  name: string;
  chainring: string;
  cog: string;
}

const NewGear = () => {
  const [gearData, setGearData] = useState<GearData>({
    name: '',
    chainring: '',
    cog: '',
  });
  const router = useRouter();

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

    const toNumberOrNull = (value: string) => (value === '' ? null : parseFloat(value));

    const submittedData = {
      ...gearData,
      chainring: toNumberOrNull(gearData.chainring),
      cog: toNumberOrNull(gearData.cog),
    };

    try {
      await axiosInstance.post('/gears', { api_v1_gear: submittedData });
      router.push('/gears');
    } catch (error) {
      console.error('ギアの作成中にエラーが発生しました！', error);
    }
  };

  return (
    <div>
      <h1>Create New Gear</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={gearData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="chainring">Chainring:</label>
          <input type="text" id="chainring" value={gearData.chainring} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="cog">Cog:</label>
          <input type="text" id="cog" value={gearData.cog} onChange={handleChange} />
        </div>
        <button type="submit">Create Gear</button>
      </form>
    </div>
  );
};

export default NewGear;
