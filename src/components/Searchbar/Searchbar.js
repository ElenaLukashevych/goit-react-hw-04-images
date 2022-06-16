import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

function Searchbar({onSubmit}) {
 
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
 

 if (searchQuery.trim() === '') {
      return toast.error('Sorry, there are no images matching your search query. Please try again.');
    }
    onSubmit(searchQuery);
    setSearchQuery('')
  }

  const handleSearchQueryChange = event => {
   setSearchQuery(event.currentTarget.value.toLowerCase())
  };

      return (
      <header className={s.Searchbar}>
        <form onSubmit={handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <ImSearch />

      <span className={s.SearchFormButtonLabel}>Search</span>
    </button>

            <input
      onChange={handleSearchQueryChange}
      className={s.SearchFormInput}
      value={searchQuery}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
    )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;
