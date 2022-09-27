import React, { useId } from 'react';

const FloatingTableWrapper = ({ children, formId }) => {
    return (
        <div>
            <div>
                <h2></h2>
                <button form={formId} type="reset">
                    Clear all
                </button>
            </div>
            {children}
            <button form={formId} type="submit">
                Save
            </button>
        </div>
    );
};

export default FloatingTableWrapper;
