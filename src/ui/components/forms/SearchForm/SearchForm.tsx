import { useEffect, useState, type ComponentProps, type FormEvent, type MouseEvent } from "react";
import { CrossIcon, SearchIcon } from "../../../svgs/icons";
import styles from "./SearchForm.module.css";

export interface SearchFormProps extends ComponentProps<"form"> {
  inputClass?: string
  searchQuery?: string
  onSearchInput?: (e: FormEvent<HTMLInputElement>) => void
  onSearchSubmit?: (query: string) => void
  placeholder?: string
}

const SearchForm = ({
  inputClass, className,
  placeholder, searchQuery,
  onSearchInput, onSearchSubmit,
}: SearchFormProps) => {
  const [query, setQuery] = useState<string>(searchQuery ?? "");

  const handleClear = () => {
    setQuery("");
  }

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setQuery((e.target as HTMLInputElement).value);
    onSearchInput?.(e);
  };

  const handleSearch = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    onSearchSubmit?.(query);
  };

  useEffect(() => {
    setQuery(searchQuery ?? "");
  }, [searchQuery]);

  return (
    <form className={`${styles.searchForm} ${className}`}>
      <input
        type="text"
        className={`${styles.searchInput} ${inputClass}`}
        value={query}
        onInput={handleInput}
        required
        placeholder={placeholder}
      />
      {
        query ? (
          <button
            type="reset" className={styles.formBtn}
            onClick={handleClear}
          >
            <CrossIcon className={`${styles.btnIcon}`} />
          </button>
        ) : null
      }
      <button
        type="submit" className={styles.formBtn}
        onClick={handleSearch}
      >
        <SearchIcon className={`${styles.btnIcon}`} />
      </button>
    </form>
  );
};

export default SearchForm;