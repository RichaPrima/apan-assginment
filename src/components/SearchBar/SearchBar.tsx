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
  // const debounce = (fn: Function, ms = 200) => {
  //   let timeoutId: number;
  //   console.log("di");
  //   return function (this: any, ...args: any) {
  //     clearTimeout(timeoutId);
  //     // timeoutId = setTimeout(() => fn.apply(this, args), ms);
  //     timeoutId = window.setTimeout(() => fn.apply(this, args), ms);
  //   };
  // };

  const debounce = <F extends (...args: any) => any>(
    func: F,
    waitFor: number
  ) => {
    let timeout: number = 0;

    const debounced = (...args: any) => {
      clearTimeout(timeout);
      setTimeout(() => func(...args), waitFor);
    };

    return debounced as (...args: Parameters<F>) => ReturnType<F>;
  };

  const onChange = debounce((event: any) => {
    console.log("event", event);
    if (onSearch) {
      const value = event.target.value;
      onSearch(value);
    }
  }, 300);

  return (
    <div className={cx(className, styles.searchbar)}>
      <input
        onChange={(event) => {
          onChange(event);
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
