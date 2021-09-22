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
  const onChange = (event: any) => {
    if(onSearch){
      const value = event.target.value;
      onSearch(value);
    }
  };

  return (
    <div className={cx(className, styles.searchbar)}>
      <input
        onChange={onChange}
        type="text"
        name="search"
        value={searchValue}
        placeholder={"Search"}
      />
      <img src={searchIcon} alt={"Search Icon"} />
    </div>
  );
};
