import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const Table2Edit = (props) => {

    const MySearch = (props) => {
      let input;
      const handleClick = () => {
        props.onSearch(input.value);
      };
      const handleClear = () => {
        input.value='';
        handleClick()
      };
      return (
        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom:'15px'}}>
          <input type="text" ref={ n => input = n } onChange={ handleClick } className="textSearch"/><i className="icon-cross2 iconSearch" onClick={ handleClear }></i><input type="submit" onClick={ handleClick } value="" className="btnSearch"/>
        </div>
      );
    };

    const onPageChange = (page, sizePerPage) => {
        props.handlePageChange(page, sizePerPage);
    }

    const customTotal = (from, to, size) => (
        <div className="react-bootstrap-table-pagination-total" style={{position: 'absolute', border: '1px solid #C8CED3', padding: '3px 4px', borderRadius: '4px', backgroundColor: 'white'}}>
          Total <b>{ size }</b>
        </div>
    );
      
    const options = {
        onPageChange: onPageChange,
        paginationSize: 4,
        pageStartIndex: 1,
        alwaysShowAllBtns: false, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: '<<',
        prePageText: '<',
        nextPageText: '>',
        lastPageText: '>>',
        // nextPageTitle: 'First page',
        // prePageTitle: 'Pre page',
        // firstPageTitle: 'Next page',
        // lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
          text: '10', value: 10
        }, {
          text: '20', value: 20
        }, {
          text: 'All', value: props.datas.length
        }]
    };

    return(
        <div>
            <ToolkitProvider
                    keyField="id"
                    data={ props.datas }
                    columns={ props.tableHead }
                    search
                    caption={ props.caption }
                >
                    {
                        (props) => (
                            <div>
                                {/* <SearchBar { ...props.searchProps } />
                                <ClearSearchButton { ...props.searchProps } className="btn-outline-dark ml-1 mb-1"/> */}
                                <MySearch { ...props.searchProps } />
                                {/* <hr /> */}
                                <BootstrapTable 
                                    { ...props.baseProps }
                                    striped
                                    hover
                                    condensed
                                    wrapperClasses="table-responsive"
                                    pagination={ paginationFactory(options) }
                                />
                            </div>
                        )
                    }
            </ToolkitProvider>
        </div>
    )
}

export default Table2Edit