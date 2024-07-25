
import React from 'react';

const PlayerPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange }) => {
  const pageNumbers = [];
 

  return (
    <div className="pagination">
      <div className="page-list flex items-center mb-3">
        <span className='w-[160px] -space-x-px pt-5 md:pb-5 pr-5 text-gray-500 mb-4'>Page Size</span>
        <select
        className=' w-[100px] block p-2 px-2 w-full text-sm text-[#A5A5A5] bg-transparent border-2 rounded-lg border-[#DFDFDF]  dark:text-[#A5A5A5] focus:outline-none focus:ring-0  peer'
         value={itemsPerPage} onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <ul className="page-numbers">
        {pageNumbers.map(number => (
          <li key={number}>
            <button onClick={() => onPageChange(number)} className={currentPage === number ? 'active' : ''}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerPagination;
