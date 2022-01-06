import { useEffect, useState } from 'react';
import Alert from './Alert';
import List from './List';

export interface ListItem {
  id: string;
  title: string;
}

function App() {
  const [list, setList] = useState<ListItem[] | []>(() => {
    return JSON.parse(localStorage.getItem('list') || '');
  });
  const [text, setText] = useState('');
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingID, setEditingID] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      showAlert(true, 'please enter a value', 'danger');
    } else if (text && isEditing) {
      setList(
        list.map(listItem => {
          if (listItem.id === editingID) {
            return { ...listItem, title: text };
          }
          return listItem;
        })
      );
      setText('');
      setEditingID(null);
      setIsEditing(false);
      showAlert(true, 'item edited', 'success');
    } else {
      setList([...list, { title: text, id: new Date().getTime().toString() }]);
      setText('');
      showAlert(true, 'item added to the list', 'success');
    }
  };

  const handleEditItem = (id: string) => {
    const editingItem = list?.find(item => item.id === id);
    setIsEditing(true);
    setEditingID(id);
    if (editingItem) {
      setText(editingItem.title);
    }
  };

  const handleRemoveItem = (id: string) => {
    setList(list.filter(listItem => listItem.id !== id));
    showAlert(true, 'item removed', 'danger');
  };

  const handleClearList = () => {
    setList([]);
    showAlert(true, 'empty list', 'danger');
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleFormSubmit}>
        {alert.show && <Alert {...alert} list={list} removeAlert={showAlert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="e.g. eggs"
            className="grocery"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button className="submit-btn">
            {isEditing ? 'Editing' : 'Submit'}
          </button>
        </div>

        {list.length > 0 && (
          <div className="grocery-container">
            <List
              list={list}
              onRemoveItem={handleRemoveItem}
              onEditItem={handleEditItem}
            />
            <button className="clear-btn" onClick={handleClearList}>
              clear list
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

export default App;
