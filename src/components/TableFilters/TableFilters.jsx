import React from 'react';

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
