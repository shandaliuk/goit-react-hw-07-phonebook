import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, selectFilteredContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import { Item, Number, Button } from './ContactList.styled';

export const ContactList = () => {
  const { isLoading, error } = useSelector(selectContacts);
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const onDeleteClick = id => dispatch(deleteContact(id));

  return (
    <>
      {isLoading && !error && <Item>Loading...</Item>}
      <ul>
        {filteredContacts.map(contact => {
          const { id, name, phone } = contact;
          return (
            <Item key={id}>
              {name}: <Number>{phone}</Number>
              <Button type="button" onClick={() => onDeleteClick(id)}>
                Delete
              </Button>
            </Item>
          );
        })}
      </ul>
      {error && !isLoading && <Item>Oops, something went wrong :(</Item>}
    </>
  );
};
