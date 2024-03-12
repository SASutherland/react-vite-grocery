import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';

const Header = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
      <span className="total-items">Items: {props.itemTotal}</span>
    </header>
  );
};

const Item = (props) => {
  return (
    <div className='item'>
      <button className='remove-item' onClick={() => props.removeItem(props.id)} />
      <span className='item-name'>{props.name}</span>
      <Counter name={props.name}/>
    </div>
  );
};

const Counter = (props) => {
  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    setQuantity((quantity) => quantity + 1);
    if (props.name === "Eggs (6)") {
      setQuantity((quantity) => quantity + 5);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity((quantity) => quantity - 1);
      if (props.name === "Eggs (6)") {
        setQuantity((quantity) => quantity - 5);
      }
    }
  };

  return (
    <div className='quantity'>
      <span className='qty-label'>QTY</span>
      <button className='increment' onClick={incrementQuantity}>+</button>
      <button className='decrement' onClick={decrementQuantity}>-</button>
      <span className='quantity-amount'>{quantity}</span>
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState([
    {
      name: "Eggs (6)",
      id: 1
    },
    {
      name: "Bananas",
      id: 2
    },
    {
      name: "Apples",
      id: 3
    },
    {
      name: "Potatoes",
      id: 4
    },
    {
      name: "Avocados",
      id: 5
    }
  ]);

  const [newItemName, setNewItemName] = useState(""); // Step 1: New state variable

  const handleRemoveItem = (id) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  const handleAddItem = () => {
    if (newItemName.trim() !== "") {
      // Check if the input is not empty
      const newItem = {
        name: newItemName,
        id: Date.now(), // Generate a unique ID (for simplicity)
      };

      setItems((prevItems) => [...prevItems, newItem]); // Add the new item to the list
      setNewItemName(""); // Clear the input field
    }
  };

  return (
    <div className='grocery-list'>
      <Header title='Grocery List' itemTotal={items.length} />

      {/* Grocery List */}
      {items.map((item) => (
        <Item
          name={item.name}
          id={item.id}
          key={item.id}
          removeItem={handleRemoveItem}
        />
      ))}

      {/* Step 2: Input field for adding a new item */}
      <div className='input-line'>
        <input
          className='input-text'
          type='text'
          placeholder='Enter a new item'
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem();
              }
            }
          }
        />
        <button className='btn-input' onClick={handleAddItem}>Add To List</button> {/* Step 3: Button to add the new item */}
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
