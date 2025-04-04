import React, { useEffect, useState } from 'react'
import { getAllCity, getAllDistrict, getAllWard } from '../../Services/ProvinceService';

export default function SelectedProvince({ getAddress }) {
  const [citys, setCitys] = useState([]);
  const [selectedCity, setSelectedCity] = useState({ id: "", name: "" });
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState({ id: "", name: "" });
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState({ id: "", name: "" });

  useEffect(() => {
    const getCityData = async () => {
      try {
        const res = await getAllCity()
        setCitys(res.data.data)
      } catch (err) {
        console.error(err)
      }
    };

    getCityData();
  }, []);

  useEffect(() => {
    const getDistrictData = async () => {
      try {
        const res = await getAllDistrict(selectedCity.id)
        setDistricts(res.data.data)
        setSelectedDistrict({ id: "", name: "" });
        setWards([]);
        setSelectedWard({ id: "", name: "" });
      } catch (err) {
        console.error(err)
      }
    };

    if (selectedCity.id) {
      getDistrictData()
    } else {
      setDistricts([]);
      setWards([]);
      setSelectedWard({ id: "", name: "" });
    }
  }, [selectedCity])

  useEffect(() => {
    const getWardData = async () => {
      try {
        const res = await getAllWard(selectedDistrict.id);
        setWards(res.data.data);
        setSelectedWard({ id: "", name: "" });
      } catch (err) {
        console.error(err);
      }
    };

    if (selectedDistrict.id) {
      getWardData();
    } else {
      setWards([]);
      setSelectedWard({ id: "", name: "" });
    }
  }, [selectedDistrict])

  useEffect(() => {
    getAddress({
      city: selectedCity.name,
      district: selectedDistrict.name,
      ward: selectedWard.name,
    });
  }, [selectedCity, selectedDistrict, selectedWard]);

  const handleChangeCity = (e) => {
    const selectedOption = citys.find(city => city.id === e.target.value);
    setSelectedCity(selectedOption ? { id: selectedOption.id, name: selectedOption.name } : { id: "", name: "" });
  };

  const handleChangeDistrict = (e) => {
    const selectedOption = districts.find(district => district.id === e.target.value);
    setSelectedDistrict(selectedOption ? { id: selectedOption.id, name: selectedOption.name } : { id: "", name: "" });
  };

  const handleChangeWard = (e) => {
    const selectedOption = wards.find(ward => ward.id === e.target.value);
    setSelectedWard(selectedOption ? { id: selectedOption.id, name: selectedOption.name } : { id: "", name: "" });
  };

  return (
    <div className='mb-4 grid lg:grid-cols-3 gap-4'>
      <div>
        <label className="block text-gray-700">Thành phố</label>
        <select className="w-full p-2 border rounded" value={selectedCity.id} id="city" onChange={handleChangeCity}>
          <option value="">Chọn thành phố</option>
          {citys.map((city) => (
            <option value={`${city.id}`} key={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Quận</label>
        <select className="w-full p-2 border rounded disabled:opacity-40 disabled:cursor-not-allowed" value={selectedDistrict.id} id="district" onChange={handleChangeDistrict} disabled={districts.length === 0}>
          <option value="">Chọn quận</option>
          {districts.map((district) => (
            <option value={`${district.id}`} key={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Phường</label>
        <select className="w-full p-2 border rounded disabled:opacity-40 disabled:cursor-not-allowed" value={selectedWard.id} id="ward" onChange={handleChangeWard} disabled={wards.length === 0}>
          <option value="">Chọn phường</option>
          {wards.map((ward) => (
            <option value={`${ward.id}`} key={ward.id}>
              {ward.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
