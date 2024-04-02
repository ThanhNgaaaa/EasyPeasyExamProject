import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import AccountItem from "../../../components/CourseItem/CourseItem";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IoIosClose } from "react-icons/io";

import { Wrapper as PopperWrapper } from "../Popper/index";
import Tippy from "@tippyjs/react/headless";
import useDebounce from "../../../hooks/useDebounce";
import * as searchService from "../../../apiService/searchService";
const cx = classNames.bind(styles);
const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [loading, setLoading] = useState(false);
  const debounce = useDebounce(searchValue, 500);
  const inputRef = useRef();

  useEffect(() => {
    if (!debounce.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);
      const result = await searchService.search(debounce);
      setSearchResult(result);
      setLoading(false);
      
    };
    fetchApi();
  }, [debounce]);
  console.log(searchResult);
  const handleHideResult = () => {
    setShowResults(false);
  };
  const handleclear = () => {
    setSearchResult([]);
    setSearchValue("");
    inputRef.current.focus();
  };
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };
  return (
    <div>
      <Tippy
        visible={showResults && searchResult.length > 0}
        interactive
        placement="bottom-start"
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h5 className={cx("search-title")}>Courses</h5>
              {searchResult.map((result) => (
                <AccountItem key={result.CourseId} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            type="text"
            className={cx("search-input")}
            name="search"
            placeholder="Search..."
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResults(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx("btn-clear")} onClick={handleclear}>
              <IoIosClose className={cx("clear")} />
            </button>
          )}

          {loading && <FontAwesomeIcon className={cx("load")} icon={faSpinner} />}
          <button className={cx("btn-search")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("icon_search")} />
          </button>
        </div>
      </Tippy>
    </div>
  );
};

export default Search;
