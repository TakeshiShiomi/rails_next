import React, { useState } from 'react';
import axiosInstance from '@lib/axios';
import { useRouter } from 'next/router';

interface WheelData {
  name: string;
  rim: string;
  tire: string;
}

const NewWheel = () => {
  const [wheelData, setWheelData] = useState<WheelData>({
    name: '',
    rim: '',
    tire: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const isNumericField = id === 'rim' || id === 'tire';
    const isValidNumericValue = /^\d*\.?\d*$/.test(value) || value === '';

    if (!isNumericField || isValidNumericValue) {
      setWheelData((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const toNumberOrNull = (value: string) => (value === '' ? null : parseFloat(value));

    const submittedData = {
      ...wheelData,
      rim: toNumberOrNull(wheelData.rim),
      tire: toNumberOrNull(wheelData.tire),
    };

    try {
      await axiosInstance.post('/wheels', { api_v1_wheel: submittedData });
      router.push('/wheels');
    } catch (error) {
      console.error('ギアの作成中にエラーが発生しました！', error);
    }
  };

  return (
    <div>
      <h1>Create New Wheel</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={wheelData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="rim">rim:</label>
          <input type="text" id="rim" value={wheelData.rim} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="tire">tire:</label>
          <input type="text" id="tire" value={wheelData.tire} onChange={handleChange} />
        </div>
        <button type="submit">Create Wheel</button>
      </form>
    </div>
  );
};

export default NewWheel;
