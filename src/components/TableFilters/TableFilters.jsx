import React, { useCallback, useState } from 'react';
import FloatingColumnsFilter from '../FloatingColumnsFilter/FloatingColumnsFilter';
import FloatingTableFilter from '../FloatingTableFilter/FloatingTableFilter';
import s from './TableFilters.module.scss';

const TableFilters = ({
    filterFields,
    onTableFilterApply,
    columnsFilterOptions,
    onColumnsFilterApply,
}) => {
    const [tableFilterOpened, setTableFilterOpened] = useState(false);
    const [columnsFilterOpened, setColumnsFilterOpened] = useState(false);
    const openFilter = useCallback(() => {
        setTableFilterOpened(true);
        setColumnsFilterOpened(false);
    }, [setTableFilterOpened, setColumnsFilterOpened]);
    const openColumns = useCallback(() => {
        setTableFilterOpened(false);
        setColumnsFilterOpened(true);
    }, [setTableFilterOpened, setColumnsFilterOpened]);
    const closeFilter = useCallback(() => {
        setTableFilterOpened(false);
    }, [setTableFilterOpened]);
    const closeColumns = useCallback(() => {
        setColumnsFilterOpened(false);
    }, [setColumnsFilterOpened]);
    return (
        <div className={s.wrapper}>
            <div className={s.filterWrapper}>
                <button onClick={openFilter}>Filter</button>
                <FloatingTableFilter
                    style={{
                        display: tableFilterOpened ? 'block' : 'none',
                    }}
                    onClose={closeFilter}
                    onFilterApply={onTableFilterApply}
                    fields={filterFields}
                />
            </div>
            <div className={s.filterWrapper}>
                <button onClick={openColumns}>Columns</button>
                <FloatingColumnsFilter
                    style={{
                        display: columnsFilterOpened ? 'block' : 'none',
                    }}
                    onClose={closeColumns}
                    onFilterApply={onColumnsFilterApply}
                    columns={columnsFilterOptions}
                />
            </div>
        </div>
    );
};

export default TableFilters;
