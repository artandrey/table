import React, { useCallback, useId } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import FloatingTableWrapper from '../FloatingTableForm/FloatingTableWrapper';
import s from './FloatingTableFilter.module.scss';

const FloatingColumnsFilter = ({
    columns,
    onFilterApply,
    onClose,
    ...otherProps
}) => {
    const formId = useId();
    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            onFilterApply && onFilterApply(formData.getAll('column'));
        },
        [onFilterApply]
    );

    const handleReset = useCallback(
        (event) => {
            onFilterApply && onFilterApply(null);
        },
        [onFilterApply]
    );
    return (
        <FloatingTableWrapper
            title="Add/Remove Columns"
            formId={formId}
            onClose={onClose}
            {...otherProps}
        >
            <form
                className={s.form}
                onSubmit={handleSubmit}
                onReset={handleReset}
                id={formId}
            >
                {columns.map((column) => (
                    <Checkbox
                        key={column.Title}
                        name="column"
                        value={column.accessor}
                        defaultChecked={column.showByDefault}
                    >
                        {column.Title}
                    </Checkbox>
                ))}
            </form>
        </FloatingTableWrapper>
    );
};

export default FloatingColumnsFilter;
