import React, {ChangeEvent, useState} from "react";
import cx from "classnames";
import searchIcon from "../../assets/images/searchIcon.svg";

import styles from "./SearchBar.module.css";
import {debounce} from "../../utils/common";

export type SearchBarProps = {
    className?: string;
    searchValue?: string;
    onSearch: (searchValue: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
                                                        className,
                                                        onSearch,
                                                    }) => {
    const [input, setInput] = useState("")

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInput(value)
        onSearch(value)
    };

    return (
        <div className={cx(className, styles.searchbar)}>
            <input
                onChange={(event) => {
                    onChange(event);
                    console.log(event.target.value)
                }}
                type="text"
                name="search"
                value={input}
                placeholder={"Search"}
            />
            <img src={searchIcon} alt={"Search"}/>
        </div>
    );
};
