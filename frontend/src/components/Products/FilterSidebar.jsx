import { useState, useEffect } from 'react';
import instance from '../../config/axiosConfig';

export default function FilterSidebar({ filters, setFilters }) {
  const [filterOptions, setFilterOptions] = useState(null);

  useEffect(() => {
    const getEnumFilters = async () => {
      try {
        const res = await instance.get("/filters");
        setFilterOptions(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy filter options", error);
      }
    };
    getEnumFilters();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: null,
      gender: "Men", // Reset về Nam
      priceRange: [0, 100],
      movement: [],
    });
  };

  return (
    <div className="p-4 border-r border-gray-200">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Price Range */}
      {/* <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          min={300000}
          max={5000000}
          className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
          value={filters.priceRange[1]}
          onChange={(e) => handleFilterChange("priceRange", [0, Number(e.target.value)])}
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div> */}

      {/* Category */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {filterOptions?.categories?.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              className="mr-2 h-4 w-4 text-blue-500"
              onChange={() => handleFilterChange("category", category)}
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {["Men", "Women"].map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              className="mr-2 h-4 w-4 text-blue-500"
              onChange={() => handleFilterChange("gender", gender)}
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Movement */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Loại máy</label>
        {filterOptions?.movements?.map((movement) => (
          <div key={movement} className="flex items-center mb-1">
            <input
              type="radio"
              value={movement}
              checked={filters.movement === movement}
              className="mr-2 h-4 w-4 text-blue-500"
              onChange={() => handleFilterChange("movement", movement)}
            />
            <span className="text-gray-700">{movement}</span>
          </div>
        ))}
      </div>

      {/* Reset Filter */}
      <button onClick={resetFilters} className="mt-4 px-4 py-2 bg-gray-200 rounded-md">
        Reset Filters
      </button>
    </div>
  );
}