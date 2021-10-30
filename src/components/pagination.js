import React from 'react';
import '../App.css'

let pageNo = 1;
const Pagination = ({items, parentCallback, currentPage}) => {

    const itemsPerPage = 4;
    pageNo = currentPage;

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const handlePageClick = (e) => {
        pageNo = Number(e.target.id);
        parentCallback(pageNo);
    }

    // Page Number Component
    const renderPageNumbers = pageNumbers.map(number => {
        return (
          <div id={number}
            className={"pages-div " + ((number === pageNo && document.getElementById(number)) ? 'page-div-clicked':'')}
            key={number}
            onClick={handlePageClick}
          >
            {number}
          </div>
        );
      });

    return (
        <div>
            <div id="page-numbers">
            {renderPageNumbers}
            </div>
        </div>
    );
}

export default Pagination;