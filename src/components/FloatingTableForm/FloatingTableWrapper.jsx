import React, { useCallback } from 'react';
import s from './FloatingTableWrapper.module.scss';

const FloatingTableWrapper = ({ children, formId, title, onClose }) => {
    const close = useCallback(() => {
        onClose && onClose();
    }, [onClose]);
    return (
        <div className={s.wrapper}>
            <div className={s.heading}>
                <h2>{title}</h2>
                <button className={s.clearButton} form={formId} type="reset">
                    Clear all
                </button>
            </div>
            {children}
            <button
                onClick={close}
                className={s.saveButton}
                form={formId}
                type="submit"
            >
                Save
            </button>
        </div>
    );
};

export default FloatingTableWrapper;
