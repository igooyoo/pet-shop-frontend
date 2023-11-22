import type { FC } from 'react';
import { useState } from 'react';

import Button from '../Button/Button';

type Props = {
  onSearch: (searchTerm: string) => void;
};

const SearchInput: FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform search or any other action here with the search term
    console.log('Search term:', searchTerm);
    onSearch(searchTerm);
    // Reset the input field
    setSearchTerm('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-5xl items-center justify-between gap-5"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Хайх үгээ оруулна уу..."
        className="w-full rounded-md border border-accent-2 px-3 py-2 shadow-md drop-shadow-sm"
      />
      <Button type="submit" variant="slim">
        Хайх
      </Button>
    </form>
  );
};

export default SearchInput;
