import React from 'react';
import FloatingColumnsFilter from '../FloatingColumnsFilter/FloatingColumnsFilter';
import FloatingTableFilter from '../FloatingTableFilter/FloatingTableFilter';

const TableFilters = ({
    filterFields,
    onTableFilterApply,
    columnsFilterOptions,
    onColumnsFilterApply,
}) => {
    return (
        <div>
            <FloatingTableFilter
                onFilterApply={onTableFilterApply}
                fields={filterFields}
            />
            <FloatingColumnsFilter
                onFilterApply={onColumnsFilterApply}
                columns={columnsFilterOptions}
            />
        </div>
    );
};

export default TableFilters;
