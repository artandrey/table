import React from 'react';
import s from './Checkbox.module.scss';
const Checkbox = ({ children, ...otherProps }) => {
    return (
        <label className={s.control + ' ' + s.control_checkbox}>
            {children}
            <input {...otherProps} type="checkbox" />
            <div className={s.control_indicator}></div>
        </label>
    );
};

export default Checkbox;
