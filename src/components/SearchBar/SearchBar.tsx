import React from "react";
import cx from "classnames";
import searchIcon from "./../../assests/images/searchIcon.svg";

import styles from "./SearchBar.module.css";

export type SearchBarProps = {
  className?: string;
  searchValue: string;
  onSearch: (searchValue: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  className,
  searchValue,
  onSearch,
}) => {
  return (
    <div className={cx(className, styles.searchbar)}>
      <input
        id={"searchBar"}
        onChange={(event) => {
          onSearch(event.target.value);
        }}
        type="text"
        name="search"
        value={searchValue}
        placeholder={"Search"}
      />
      <img src={searchIcon} alt={"Search Icon"} />
    </div>
  );
};
