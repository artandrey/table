import React, { useMemo, useState } from 'react';
import FloatingColumnsFilter from '../FloatingColumnsFilter/FloatingColumnsFilter';
import FloatingTableFilter from '../FloatingTableFilter/FloatingTableFilter';
import SearchBar from '../SearchBar/SearchBar';
import Table from '../Table/Table';
import s from './TableWithFilters.module.scss';

const preparePlaceholder = function (searchBy) {
    const accessors = searchBy.map((el) => el.Title);
    if (accessors.lenght === 1) return accessors[0];

    const last = accessors.splice(accessors.lenght - 1, 1);
    return accessors.join(' ') + ' or ' + last;
};
const getAccessorsFromSearchBy = (searchBy) =>
    searchBy.map((el) => el.accessor);

const getSearchResult = function (searchValue, data, accessors) {
    if (!accessors) return data;
    return data.filter((el) =>
        accessors.find((accessor) =>
            el[accessor].toLowerCase().includes(searchValue.toLowerCase())
        )
    );
};
const TableWithFilters = ({
    className,
    data,
    columns,
    searchBy,
    filterBy,
    columnsFilterOptions,
    ...otherProps
}) => {
    const [searchBarValue, setSearchBarValue] = useState('');
    const [filterValue, setFilterValue] = useState(null);
    const [showedColumns, setShowedColumns] = useState(null);

    data = useMemo(() => {
        return searchBarValue
            ? getSearchResult(
                  searchBarValue,
                  data,
                  getAccessorsFromSearchBy(searchBy)
              )
            : data;
    }, [searchBarValue, data, searchBy]);
    const filterFields = useMemo(() => {
        return filterBy.reduce((fields, filterOption, i) => {
            const values = data.reduce((values, el) => {
                const value = el[filterOption.accessor];
                if (values.includes(value) || !value) return values;
                values.push(value);
                return values;
            }, []);
            fields[i] = {
                title: filterOption.Title,
                accessor: filterOption.accessor,
                fields: values,
            };
            return fields;
        }, []);
    }, [filterBy, data]);

    data = useMemo(() => {
        if (!filterValue) return data;
        const filterValueEntries = Object.entries(filterValue);
        return data.filter((el) =>
            filterValueEntries.find(([accessor, values]) =>
                values.includes(el[accessor])
            )
        );
    }, [data, filterValue]);

    columns = useMemo(() => {
        if (!showedColumns) return columns;
        return columns.filter((column) =>
            showedColumns.includes(column.accessor)
        );
    }, [columns, showedColumns]);

    return (
        <div>
            <div className={s.heading}>
                <SearchBar
                    placeholder={'Search by ' + preparePlaceholder(searchBy)}
                    onSearch={setSearchBarValue}
                />
                <FloatingTableFilter
                    onFilterApply={setFilterValue}
                    fields={filterFields}
                />
                <FloatingColumnsFilter
                    onFilterApply={setShowedColumns}
                    columns={columnsFilterOptions}
                />
            </div>
            <Table showRows={10} columns={columns} data={data} />
        </div>
    );
};

export default TableWithFilters;
