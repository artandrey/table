import React from 'react';

const Details = ({ children }) => {
    const [summary, content] = children;
    return (
        <details>
            <summary>{summary}</summary>
            <div>{content}</div>
        </details>
    );
};

export default Details;
