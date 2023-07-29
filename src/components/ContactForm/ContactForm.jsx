import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/slices/ContactsSlice';
import css from './ContactForm.module.css';
import { Notify } from 'notiflix';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const checkDuplicate = value =>
    contacts.some(({ number }) => number === value);

  const handleSubmit = event => {
    event.preventDefault();
    checkDuplicate(number)
      ? Notify.warning(`This number '${number}' already exist`)
      : dispatch(addContact({ name, number }));

    setName('');
    setNumber('');
  };

  return (
    <div className={css.container}>
      <form className={css.form} action="" onSubmit={handleSubmit}>
        <label htmlFor="" className={css.label}>
          Name
          <input
            className={css.login}
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
            pattern="^[A-Za-z.'\- ]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor="" className={css.label}>
          Number
          <input
            className={css.login}
            type="tel"
            name="number"
            onChange={handleChange}
            value={number}
            pattern="^\+?\d{1,4}?\s?\(?\d{1,4}?\)?\s?\d{1,4}\s?\d{1,4}\s?\d{1,9}$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
