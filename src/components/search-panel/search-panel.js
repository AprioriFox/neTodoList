import React from 'react';

import './search-panel.css';

const SearchPanel = ( {onChangeSearchFilter} ) => {
  return (
    <input onChange={ (event)=>onChangeSearchFilter(event.target.value) }
           type="text"
           className="form-control search-input"
           placeholder="type to search" />
  );
};

export default SearchPanel;
