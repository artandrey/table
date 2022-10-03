import React, { useEffect, useMemo, useState } from 'react';
import { useRowSelect } from 'react-table';
import { useSortBy, useTable } from 'react-table';
import Checkbox from '../Checkbox/Checkbox';
import TablePagesNavigation from '../TablePagesNavigation/TablePagesNavigation';
import Triangles from '../Triangles/Triangles';
import s from './Table.module.scss';

export const TableHead = ({ headerGroups, select, sort }) => {
    return (
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, i) => {
                        const sortable = i !== 0 && select && sort;
                        const selectable = i === 0 && select;
                        return (
                            <th
                                {...column.getHeaderProps(
                                    sortable && column.getSortByToggleProps()
                                )}
                            >
                                <div
                                    className={
                                        s.headingCell +
                                        (selectable
                                            ? ' ' + s.headingCell__selectable
                                            : '')
                                    }
                                >
                                    {column.render('Header')}
                                    {sortable && <Triangles />}
                                </div>
                            </th>
                        );
                    })}
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

const Table = ({
    className,
    data,
    columns,
    showRows,
    sort = true,
    select,
    onRowSelect,
    ...otherProps
}) => {
    const plugins = useMemo(() => {
        return [sort && useSortBy, select && useRowSelect].filter(
            (plugin) => typeof plugin === 'function'
        );
    }, [sort, select]);
    const { getTableProps, headerGroups, rows, prepareRow, selectedFlatRows } =
        useTable({ columns, data }, ...plugins, (hooks) => {
            if (!select) return;
            hooks.visibleColumns.push((columns) => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div className={s.checkboxWrapper}>
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div className={s.checkboxWrapper}>
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ]);
        });
    useEffect(() => {
        select &&
            onRowSelect &&
            onRowSelect(
                selectedFlatRows.map((slectedRow) => slectedRow.original)
            );
    }, [selectedFlatRows, onRowSelect, select]);

    const [pageNumber, setPageNumber] = useState(1);
    const showStart = showRows * (pageNumber - 1);
    const showEnd = showRows * pageNumber;
    const showedRows = showRows ? rows.slice(showStart, showEnd) : rows;
    return (
        <div>
            <table className={s.table} {...otherProps} {...getTableProps()}>
                <TableHead
                    select={select}
                    sort={sort}
                    headerGroups={headerGroups}
                />
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
