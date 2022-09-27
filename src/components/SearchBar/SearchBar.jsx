import React, { useCallback, useState } from 'react';
import s from './SearchBar.module.scss';

const SearchBar = ({ onSearch, placeholder }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleChange = useCallback(
        (event) => {
            const value = event.target.value;
            setSearchValue(value.trim());
        },
        [setSearchValue]
    );
    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            onSearch(searchValue);
        },
        [onSearch, searchValue]
    );
    return (
        <form className={s.wrapper} onSubmit={handleSubmit}>
            <input
                className={s.searchbar}
                placeholder={placeholder}
                onChange={handleChange}
                type="text"
            />
            <button className={s.button}>Search</button>
        </form>
    );
};

export default SearchBar;
