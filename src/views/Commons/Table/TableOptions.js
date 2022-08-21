import React from 'react';

export function renderShowsTotal(start, to, total) {
    return  (
        <div className="pagTextTotal">
        Total: { total }
        </div>
    );
}
export const tableOptions = { 
        noDataText: 'There is no data to display.', 
        clearSearch: true,
        sizePerPageList: [ {
            text: '7', value: 7
        }, {
            text: '15', value: 15
        }, {
            text: '25', value: 25
        } ],
        sizePerPage: 7,
        pageStartIndex: 1,
        paginationSize: 3,
        prePage: '<',
        nextPage: '>',
        firstPage: '<<',
        lastPage: '>>',
        paginationShowsTotal: renderShowsTotal,
        paginationPosition: 'bottom'
}