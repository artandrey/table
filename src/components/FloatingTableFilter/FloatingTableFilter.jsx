import React, { useCallback, useId } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import Details from '../Details/Details';
import FloatingTableWrapper from '../FloatingTableForm/FloatingTableWrapper';
import s from './FloatingTableFilter.module.scss';

const FloatingTableFilter = ({ fields, onFilterApply, onClose }) => {
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
        <FloatingTableWrapper
            title={'Filter'}
            formId={formId}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} onReset={handleReset} id={formId}>
                {fields.map((fieldSet) => (
                    <Details key={fieldSet.title}>
                        {fieldSet.title}
                        <div className={s.fieldsWrapper}>
                            {fieldSet.fields.map((field) => (
                                <Checkbox
                                    name={fieldSet.accessor}
                                    value={field}
                                    defaultChecked
                                >
                                    {field}
                                </Checkbox>
                            ))}
                        </div>
                    </Details>
                ))}
            </form>
        </FloatingTableWrapper>
    );
};

export default FloatingTableFilter;
