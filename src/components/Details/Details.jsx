import React from 'react';
import s from './Details.module.scss';

const Details = ({ children }) => {
    const [summary, content] = children;
    return (
        <details className={s.details}>
            <summary>
                <div className={s.summary}>
                    <h3 className={s.detailsHeader}>{summary}</h3>
                </div>
            </summary>
            <div className={s.content}>{content}</div>
        </details>
    );
};

export default Details;
