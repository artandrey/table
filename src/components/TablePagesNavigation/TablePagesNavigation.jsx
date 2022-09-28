import React, { useCallback, useState } from 'react';
import s from './TablePagesNavigation.module.scss';

const TablePagesNavigation = ({
    currentPage = 1,
    showNumbers = 5,
    pagesCount,
    onChange,
}) => {
    const [tablePageNumber, setTablePageNumber] = useState(currentPage);
    const [navigationPageNumber, setNavigationPageNumber] = useState(1);
    const next = useCallback(() => {
        setNavigationPageNumber((number) =>
            number + 1 > pagesCount ? number : number + 1
        );
    }, [setNavigationPageNumber]);
    const previous = useCallback(() => {
        setNavigationPageNumber((number) =>
            number - 1 <= 0 ? number : number - 1
        );
    }, [setNavigationPageNumber]);
    const handleChange = useCallback(
        (event) => {
            const value = +event.target.value;
            setTablePageNumber(value);
            onChange && onChange(value);
        },
        [onChange, setTablePageNumber]
    );
    const items = [];
    const allowMoveForward = !(navigationPageNumber > pagesCount - showNumbers);
    const allowMoveBackward = !(navigationPageNumber <= 1);
    for (let i = 0; i < showNumbers; i++) {
        const number = navigationPageNumber + i;
        if (number > pagesCount) break;
        items[i] = (
            <li
                className={
                    s.list__item +
                    ' ' +
                    (tablePageNumber === number ? s.list__item__active : '')
                }
                key={`item_${number}`}
            >
                <label>
                    <span>{number}</span>
                    <input type="radio" name="page" value={number} />
                </label>
            </li>
        );
    }
    return (
        <div className={s.wrapper}>
            {allowMoveBackward && <button onClick={previous}>previous</button>}
            <ul className={s.list} onChange={handleChange}>
                {items}
            </ul>
            {allowMoveForward && <button onClick={next}>next</button>}
        </div>
    );
};

export default TablePagesNavigation;
