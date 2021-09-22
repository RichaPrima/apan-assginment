import React, { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import logo from "./../../assests/images/logo.svg";

import styles from "./Header.module.css";

export type HeaderProps = {
  onSearch: (searchValue: string) => void;
};

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    onSearch && onSearch(searchValue);
  }, [searchValue]);

  return (
    <div className={styles.main}>
      <img src={logo} alt={"Logo"} />
      <SearchBar
        onSearch={setSearchValue}
        searchValue={searchValue}
        className={styles.searchBar}
      />
    </div>
  );
};
