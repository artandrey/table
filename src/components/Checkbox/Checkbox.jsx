import React from 'react';
import './Checkbox.css';
const Checkbox = ({ children, ...otherProps }) => {
    return (
        <label class="control control-checkbox">
            {children}
            <input {...otherProps} type="checkbox" />
            <div className="control_indicator"></div>
        </label>
    );
};

export default Checkbox;
