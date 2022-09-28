import React, { useState } from 'react';
import { useSortBy, useTable } from 'react-table';
import TablePagesNavigation from '../TablePagesNavigation/TablePagesNavigation';
import Triangles from '../Triangles/Triangles';
import s from './Table.module.scss';

export const TableHead = ({ headerGroups }) => {
    return (
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th
                            {...column.getHeaderProps(
                                column.getSortByToggleProps()
                            )}
                        >
                            <div className={s.headingCell}>
                                {column.render('Header')}
                                <Triangles />
                            </div>
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    );
};

export const TableBody = ({ rows, prepareRow }) => {
    return (
        <tbody>
            {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                );
            })}
        </tbody>
    );
};

const Table = ({ className, data, columns, showRows, ...otherProps }) => {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable(
        { columns, data },
        useSortBy
    );
    const [pageNumber, setPageNumber] = useState(1);
    const showStart = showRows * (pageNumber - 1);
    const showEnd = showRows * pageNumber;
    const showedRows = showRows ? rows.slice(showStart, showEnd) : rows;
    return (
        <div>
            <table className={s.table} {...otherProps} {...getTableProps()}>
                <TableHead headerGroups={headerGroups} />
                <TableBody rows={showedRows} prepareRow={prepareRow} />
            </table>
            {showRows && (
                <div className={s.bottom}>
                    <span className={s.tableRowsInfoText}>
                        Showing <strong>{showStart + 1}</strong> to{' '}
                        <strong>{showEnd}</strong> of{' '}
                        <strong>{rows.length}</strong> rows
                    </span>
                    <TablePagesNavigation
                        showNumbers={5}
                        pagesCount={Math.ceil(rows.length / showRows)}
                        onChange={setPageNumber}
                    />
                </div>
            )}
        </div>
    );
};

export default Table;
