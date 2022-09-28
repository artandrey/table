import React from 'react';
import TableWithFilters from './components/TableWithFilters/TableWithFilters';
import tableData from './audit';

function App() {
    const data = React.useMemo(() => tableData, []);
    const columns = React.useMemo(
        () =>
            Object.keys(tableData[0]).map((el, i) => ({
                Header: el.split('_').join(' '),
                accessor: el,
                showByDefault: i < 5,
                Title: el
                    .split('_')
                    .map((el) => {
                        el = el.split('');
                        return (
                            el.splice(0, 1)[0].toUpperCase() +
                            el.join('').toLowerCase()
                        );
                    })
                    .join(' '),
            })),
        []
    );
    const searchBy = [
        {
            Title: 'audit name',
            accessor: 'AUDIT_TITLE',
        },
        {
            Title: 'audit id',
            accessor: 'AUID',
        },
        {
            Title: 'audit lead',
            accessor: 'AUDIT_CREATOR',
        },
    ];

    const filterBy = [
        {
            Title: 'Audit Region',
            accessor: 'AUDIT_REGION',
        },
        {
            Title: 'Risk Rating',
            accessor: 'RISK_RATING',
        },
        {
            Title: 'Document Status',
            accessor: 'DOCUMENT_STATUS',
        },
    ];

    return (
        <div>
            <TableWithFilters
                data={data}
                columns={columns}
                searchBy={searchBy}
                filterBy={filterBy}
                columnsFilterOptions={columns}
                showRows={10}
            />
        </div>
    );
}

export default App;
