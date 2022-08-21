import React from 'react';

export function renderShowsTotal(start, to, total) {
    return  (
        <div className="pagTextTotal">
        Total: { total }
        </div>
    );
}
export const tableEditOptions = { 
        noDataText: 'There is no data to display.', 
        clearSearch: true,
}