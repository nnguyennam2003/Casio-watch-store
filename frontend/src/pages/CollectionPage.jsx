import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import FilterSidebar from '../components/Products/FilterSidebar'
import SortOption from '../components/Products/SortOption'
import ProductGrid from '../components/Products/ProductGrid'
import instance from '../config/axiosConfig'
import LoadingGrid from '../components/Loading/LoadingGrid'

export default function CollectionPage() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: null,
        gender: "",
        priceRange: [300000, 5000000],
        movement: [],
    });
    const [loading, setLoading] = useState(false);

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        fetchFilteredProducts();
    }, [filters]);

    const fetchFilteredProducts = async () => {
        setLoading(true)
        try {
            const res = await instance.get("/products", {
                params: {
                    category: filters.category || undefined,
                    gender: filters.gender || undefined,
                    minPrice: filters.priceRange[0],
                    maxPrice: filters.priceRange[1],
                    movement: filters.movement.length > 0 ? filters.movement : undefined,
                }
            });
            console.log("Filters applied:", filters);
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col lg:flex-row">
            <button onClick={toggleSidebar} className="lg:hidden border border-gray-300 p-2 flex justify-center items-center">
                <FaFilter className="mr-2" />
                Filters
            </button>

            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>

            <div className="grow p-4">
                <SortOption />

                {
                    loading ? (
                        <div className='flex flex-col gap-y-8'>
                            <LoadingGrid />
                            <LoadingGrid />
                            <LoadingGrid />
                            <LoadingGrid />
                        </div>
                    ) : (
                        <ProductGrid products={products} />
                    )
                }
            </div>
        </div>
    );
}