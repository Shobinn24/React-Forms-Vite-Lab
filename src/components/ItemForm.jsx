import { useState } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

function ItemForm({ onItemFormSubmit }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    // Create new item
    const newItem = {
      id: uuid(),
      name: name,
      category: category,
    };

    // Pass new item to parent via callback
    onItemFormSubmit(newItem);

    // Clear form
    setName("");
    setCategory("Produce");
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input 
          type="text" 
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </label>

      <label>
        Category:
        <select 
          name="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

ItemForm.propTypes = {
  onItemFormSubmit: PropTypes.func.isRequired,
};

export default ItemForm;