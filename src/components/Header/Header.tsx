import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import logo from "./../../assests/images/logo.svg";

import styles from "./Header.module.css";

export type HeaderProps = {
  searchValue: string;
  onSearch: (searchValue: string) => void;
};

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchValue = "",
}) => {
  return (
    <div className={styles.main}>
      <img src={logo} alt={"Logo"} />
      <SearchBar
        onSearch={onSearch}
        searchValue={searchValue}
        className={styles.searchBar}
      />
    </div>
  );
};
