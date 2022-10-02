import React from 'react';
import s from './Checkbox.module.scss';
const Checkbox = ({ children, indeterminate, ...otherProps }) => {
    return (
        <label className={s.control + ' ' + s.control_checkbox}>
            <input {...otherProps} type="checkbox" />
            <div className={s.control_indicator}></div>
            {children}
        </label>
    );
};

export default Checkbox;
