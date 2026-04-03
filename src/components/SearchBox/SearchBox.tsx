import css from "./SearchBox.module.css";

interface SearchBoxProps {
  defaultValue: string;
  onChange: (value: string) => void;
}

function SearchBox({ defaultValue, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      defaultValue={defaultValue}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search notes"
    />
  );
}

export default SearchBox;
