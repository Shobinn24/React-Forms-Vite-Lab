import { useState } from "react";
import PropTypes from "prop-types";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, onItemFormSubmit }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  const itemsToDisplay = items.filter((item) => {
    // Filter by category
    if (selectedCategory !== "All" && item.category !== selectedCategory) {
      return false;
    }

    // Filter by search text
    if (search !== "" && !item.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter 
        search={search}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange} 
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

ShoppingList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemFormSubmit: PropTypes.func.isRequired,
};

export default ShoppingList;