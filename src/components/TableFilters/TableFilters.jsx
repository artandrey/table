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
                onFilterApply={setShowedColumns}
                columns={onColumnsFilterApply}
            />
        </div>
    );
};

export default TableFilters;
