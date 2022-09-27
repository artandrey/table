import React, { useCallback, useState } from 'react';

const TablePagesNavigation = ({
    currentPage = 0,
    showNumbers = 5,
    pagesCount,
    onChange,
}) => {
    const [pageIndex, setPageIndex] = useState(currentPage);
    const next = useCallback(() => {
        setPageIndex((index) => (index + 1 < pagesCount ? index + 1 : index));
    }, [setPageIndex]);
    const previous = useCallback(() => {
        setPageIndex((index) => (index > 0 ? index - 1 : index));
    }, [setPageIndex]);
    const handleChange = useCallback(
        (event) => {
            const value = event.target.value;
            onChange && onChange(+value);
        },
        [onChange]
    );
    const items = [];
    for (let i = 0; i < showNumbers; i++) {
        const number = pageIndex + i + 1;
        items[i] = (
            <li key={`item_${number}`}>
                <label>
                    <span>{number}</span>
                    <input type="radio" name="page" value={number} />
                </label>
            </li>
        );
    }
    return (
        <div>
            <button onClick={previous}>previous</button>
            <ul onChange={handleChange}>{items}</ul>
            <button onClick={next}>next</button>
        </div>
    );
};

export default TablePagesNavigation;
