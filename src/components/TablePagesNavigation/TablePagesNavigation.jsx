import React, { useCallback, useState } from 'react';
import s from './TablePagesNavigation.module.scss';

const TablePagesNavigation = ({
    currentPage = 1,
    showNumbers = 5,
    pagesCount,
    onChange,
}) => {
    const [pageNumber, setPageNumber] = useState(currentPage);
    const next = useCallback(() => {
        setPageNumber((index) =>
            index + showNumbers < pagesCount ? index + 1 : index
        );
    }, [setPageNumber]);
    const previous = useCallback(() => {
        setPageNumber((index) => (index >= 0 ? index - 1 : index));
    }, [setPageNumber]);
    const handleChange = useCallback(
        (event) => {
            const value = +event.target.value;
            setPageNumber(value);
            onChange && onChange(value);
        },
        [onChange]
    );
    const items = [];
    for (let i = 0; i < showNumbers; i++) {
        const number = pageNumber + i;
        if (number >= pagesCount) break;
        items[i] = (
            <li className={s.list__item} key={`item_${number}`}>
                <label>
                    <span>{number}</span>
                    <input type="radio" name="page" value={number} />
                </label>
            </li>
        );
    }
    return (
        <div className={s.wrapper}>
            <button onClick={previous}>previous</button>
            <ul className={s.list} onChange={handleChange}>
                {items}
            </ul>
            <button onClick={next}>next</button>
        </div>
    );
};

export default TablePagesNavigation;
