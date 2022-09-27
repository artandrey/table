import React, { useCallback, useId } from 'react';
import Details from '../Details/Details';
import FloatingTableWrapper from '../FloatingTableForm/FloatingTableWrapper';

const FloatingTableFilter = ({ fields, onFilterApply }) => {
    const formId = useId();
    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const filterValue = Object.fromEntries(
                fields.map((field) => [
                    field.accessor,
                    formData.getAll(field.accessor),
                ])
            );
            onFilterApply && onFilterApply(filterValue);
        },
        [onFilterApply, fields]
    );
    const handleReset = useCallback(
        (event) => {
            onFilterApply && onFilterApply(null);
        },
        [onFilterApply]
    );
    return (
        <FloatingTableWrapper formId={formId}>
            <form onSubmit={handleSubmit} onReset={handleReset} id={formId}>
                {fields.map((fieldSet) => (
                    <Details key={fieldSet.title}>
                        {fieldSet.title}
                        <div>
                            {fieldSet.fields.map((field) => (
                                <label key={field}>
                                    <input
                                        name={fieldSet.accessor}
                                        value={field}
                                        type="checkbox"
                                        defaultChecked
                                    />
                                    <span>{field}</span>
                                </label>
                            ))}
                        </div>
                    </Details>
                ))}
            </form>
        </FloatingTableWrapper>
    );
};

export default FloatingTableFilter;
