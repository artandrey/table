import React, { useCallback, useId } from 'react';
import FloatingTableWrapper from '../FloatingTableForm/FloatingTableWrapper';

const FloatingColumnsFilter = ({ columns, onFilterApply }) => {
    const formId = useId();
    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        onFilterApply && onFilterApply(formData.getAll('column'));
    }, []);

    const handleReset = useCallback((event) => {
        onFilterApply && onFilterApply(null);
    });
    return (
        <FloatingTableWrapper formId={formId}>
            <form onSubmit={handleSubmit} onReset={handleReset} id={formId}>
                {columns.map((column) => (
                    <label key={column.Title}>
                        <input
                            type="checkbox"
                            name="column"
                            value={column.accessor}
                            defaultChecked={column.showByDefault}
                        />
                        <span>{column.Title}</span>
                    </label>
                ))}
            </form>
        </FloatingTableWrapper>
    );
};

export default FloatingColumnsFilter;
