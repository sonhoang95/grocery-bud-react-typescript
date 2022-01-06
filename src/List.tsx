import { FaEdit, FaTrash } from 'react-icons/fa';
import { ListItem } from './App';

interface ListProps {
  list: ListItem[];
  onRemoveItem: (id: string) => void;
  onEditItem: (id: string) => void;
}

const List = ({ list, onRemoveItem, onEditItem }: ListProps) => {
  return (
    <div className="grocery-list">
      {list?.map(listItem => {
        const { id, title } = listItem;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => onEditItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => onRemoveItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
