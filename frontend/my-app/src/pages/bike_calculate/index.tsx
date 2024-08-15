import React, { useEffect, useState } from 'react';
import axiosInstance from '@lib/axios';

interface Gear {
  id: string;
  name: string;
  cog: number;
  chainring: number;
  ratio?: number;
}

interface Wheel {
  id: string;
  name: string;
  rim: number;
  tire: number;
  diameter: number;
  circumference: number;
}

const GearAndWheelSelector = () => {
  const [gearId, setGearId] = useState('');
  const [gears, setGears] = useState<Gear[]>([]);
  const [gearDetails, setGearDetails] = useState<Gear | null>(null);
  const [gearRatio, setGearRatio] = useState<number | null>(null);

  const [wheelId, setWheelId] = useState('');
  const [wheels, setWheels] = useState<Wheel[]>([]);
  const [wheelDetails, setWheelDetails] = useState<Wheel | null>(null);
  const [wheelCalculates, setWheelCalculates] = useState<Wheel | null>(null);

  useEffect(() => {
    // ギアデータの取得
    axiosInstance
      .get('/gears')
      .then((response) => {
        setGears(response.data);
      })
      .catch((error) => {
        console.error('ギアデータの取得中にエラーが発生しました:', error);
      });

    // ホイールデータの取得
    axiosInstance
      .get('/wheels')
      .then((response) => {
        setWheels(response.data);
      })
      .catch((error) => {
        console.error('ホイールデータの取得中にエラーが発生しました:', error);
      });
  }, []);

  const handleGearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGearId(event.target.value);
    setGearDetails(null); // ギア選択が変更されたら詳細をクリア
    setGearRatio(null); // ギア比をクリア
  };

  const getGearDetails = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/gears/${id}`);
      setGearDetails(response.data);
    } catch (error) {
      console.error('ギア詳細の取得中にエラーが発生しました:', error);
    }
  };

  const calculateGearRatio = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/gears/${id}/ratio`);
      setGearRatio(response.data.ratio); // ギア比を設定
    } catch (error) {
      console.error('ギア比の計算中にエラーが発生しました:', error);
    }
  };

  const handleWheelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWheelId(event.target.value);
    setWheelDetails(null); // ホイール選択が変更されたら詳細をクリア
    setWheelCalculates(null); // 直径円周をクリア
  };

  const getWheelDetails = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/wheels/${id}`);
      setWheelDetails(response.data);
    } catch (error) {
      console.error('ホイール詳細の取得中にエラーが発生しました:', error);
    }
  };

  const calculateWheel = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/wheels/${id}/calculate`);
      setWheelCalculates(response.data); // 直径円周を設定
    } catch (error) {
      console.error('直径円周の計算中にエラーが発生しました:', error);
    }
  };

  return (
    <div>
      <h1>選択と計算</h1>
      <h3>ギア選択</h3>
      <select value={gearId} onChange={handleGearChange}>
        <option value="">ギアを選択</option>
        {gears.map((gear) => (
          <option key={gear.id} value={gear.id}>
            {gear.name}
          </option>
        ))}
      </select>
      <button onClick={() => getGearDetails(gearId)}>詳細表示</button>
      <button onClick={() => calculateGearRatio(gearId)}>比率計算</button>
      <h3>ホイール選択</h3>
      <select value={wheelId} onChange={handleWheelChange}>
        <option value="">ホイールを選択</option>
        {wheels.map((wheel) => (
          <option key={wheel.id} value={wheel.id}>
            {wheel.name}
          </option>
        ))}
      </select>
      <button onClick={() => getWheelDetails(wheelId)}>詳細表示</button>
      <button onClick={() => calculateWheel(wheelId)}>直径円周計算</button>
      {gearDetails && (
        <div>
          <h4>ギア詳細:</h4>
          <p>名前: {gearDetails.name}</p>
          <p>コグ: {gearDetails.cog}</p>
          <p>チェーンリング: {gearDetails.chainring}</p>
        </div>
      )}
      {gearRatio && (
        <div>
          <h4>ギア比:</h4>
          <p>比率: {gearRatio}</p>
        </div>
      )}

      {wheelDetails && (
        <div>
          <h4>ホイール詳細:</h4>
          <p>名前: {wheelDetails.name}</p>
          <p>リム径: {wheelDetails.rim}</p>
          <p>タイヤ幅: {wheelDetails.tire}</p>
        </div>
      )}
      {wheelCalculates && (
        <div>
          <h4>計算結果:</h4>
          <p>直径: {wheelCalculates.diameter}</p>
          <p>円周: {wheelCalculates.circumference}</p>
        </div>
      )}
    </div>
  );
};

export default GearAndWheelSelector;
