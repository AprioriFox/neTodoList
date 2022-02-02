import React from 'react';

import './item-status-filter.css';

const ItemStatusFilter = ({onToggleStatus}) => {
  return (

    <div className="btn-group">
      <button onClick={() => onToggleStatus('all')}
              type="button"
              className="btn btn-info">All</button>
      <button onClick={() => onToggleStatus('active')}
              type="button"
              className="btn btn-outline-secondary">Active</button>
      <button onClick={() => onToggleStatus('done')}
              type="button"
              className="btn btn-outline-secondary">Done</button>
    </div>
  );
};

export default ItemStatusFilter;
