import styles from "../../styles/brand.module.css"
import {React, useState, useEffect, useContext} from 'react'
const BrandHeader = () => {
    const [searchQuery, setSearchQuery] = useState('');
    // Results of the search query in an array
    const [filteredSearch, setFilteredSearch] = useState([]);
    const [searchResult, setSearchResult] = useState([])
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
    return(
        <div className="pt-2 m-2 ">
      <div className="mx-auto p-5 ">
        <div className="flex items-center" >   
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                
                </div>
                <input type="text" onChange={handleSearchChange} value={searchQuery} id="simple-search" className="bg-gray-50 p-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="brand, merch, category" required/>
            </div>
      
        </div>
  </div>
  </div>
    );
};

export default BrandHeader