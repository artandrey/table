import React, { useCallback, useState } from 'react';
import FloatingColumnsFilter from '../FloatingColumnsFilter/FloatingColumnsFilter';
import FloatingTableFilter from '../FloatingTableFilter/FloatingTableFilter';

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
    return (
        <div>
            <div>
                <button onClick={openFilter}>Filter</button>
                {tableFilterOpened && (
                    <FloatingTableFilter
                        onFilterApply={onTableFilterApply}
                        fields={filterFields}
                    />
                )}
            </div>
            <div>
                <button onClick={openColumns}>Columns</button>
                {columnsFilterOpened && (
                    <FloatingColumnsFilter
                        onFilterApply={onColumnsFilterApply}
                        columns={columnsFilterOptions}
                    />
                )}
            </div>
        </div>
    );
};

export default TableFilters;
