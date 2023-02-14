import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import {TextField} from "@mui/material";
import useDebounce from "../../../hooks/debounce";
import s from './searchInput.module.scss'

type SearchInputPropsType = {
  searchHandler: (packName: string) => void
}

export const SearchInput: FC<SearchInputPropsType> = ({
                                                        searchHandler
                                                      }) => {

  const [value, setValue] = useState('')
  const debouncedPackName = useDebounce(value, 750)

  const onChangePackNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    searchHandler(debouncedPackName)
  }, [searchHandler, debouncedPackName])

  return (
    <div className={s.searchContainer}>
      <span>Search</span>
      <TextField value={value} onChange={onChangePackNameHandler} className={s.searchInput} size={'small'}
                 id="outlined-basic" label={<SearchIcon/>} variant="outlined"/>
    </div>
  );
};

