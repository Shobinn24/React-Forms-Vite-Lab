# Shopping List - React Controlled Components Lab

A fully-functional shopping list application built with React, demonstrating controlled components, form handling, state management, and filtering capabilities.

## Features

### Core Functionality
- **Add Items** - Add new items to shopping list via controlled form
- **Search Filter** - Real-time search filtering by item name
- **Category Filter** - Filter items by category (Produce, Dairy, Dessert)
- **Add to Cart** - Toggle items in/out of shopping cart
- **Dark Mode** - Switch between light and dark themes

### Technical Highlights
- Controlled form inputs with React state
- Multiple filtering strategies (search + category)
- State lifting and prop drilling
- Event handling and callbacks
- UUID generation for unique IDs
- Component composition

## Technologies Used

- **React 18** - Component-based UI library
- **React Hooks** - useState for state management
- **Vite** - Fast build tool and dev server
- **UUID** - Unique ID generation for items
- **CSS** - Custom styling with dark mode support

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/shobinn24/react-forms-vite-lab.git
cd react-forms-vite-lab
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Run tests:**
```bash
npm test
```

The app will open at `http://localhost:5173`

## Project Structure
```
react-controlled-components-lab/
├── src/
│   ├── components/
│   │   ├── App.jsx              # Main app component with items state
│   │   ├── Header.jsx           # Header with dark mode toggle
│   │   ├── ShoppingList.jsx     # List container with filtering logic
│   │   ├── ItemForm.jsx         # Controlled form to add items
│   │   ├── Filter.jsx           # Search and category filters
│   │   └── Item.jsx             # Individual item with cart toggle
│   ├── data/
│   │   └── items.js             # Initial shopping list data
│   ├── index.css                # Global styles
│   └── main.jsx                 # App entry point
├── package.json
└── README.md
```

## Component Architecture

### Data Flow
```
App (manages items array)
└── ShoppingList (manages filters: search, category)
    ├── ItemForm (controlled form for new items)
    ├── Filter (controlled search input + category select)
    └── Item (individual item with cart state)
```

### State Management

**App.jsx:**
- `items` - Array of all shopping list items
- `isDarkMode` - Boolean for theme toggle

**ShoppingList.jsx:**
- `search` - String for search filter
- `selectedCategory` - String for category filter

**ItemForm.jsx:**
- `name` - String for item name input
- `category` - String for category select

**Item.jsx:**
- `isInCart` - Boolean for cart status

## Key Concepts Demonstrated

### 1. Controlled Components

All form inputs are controlled, meaning their values are stored in state:
```jsx
function ItemForm({ onItemFormSubmit }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name}                    // Controlled by state
        onChange={(e) => setName(e.target.value)}
      />
      <select 
        value={category}                // Controlled by state
        onChange={(e) => setCategory(e.target.value)}
      >
        {/* options */}
      </select>
    </form>
  );
}
```

### 2. State Lifting

Search state lives in `ShoppingList` because both `Filter` and the item list need it:
```jsx
function ShoppingList({ items }) {
  const [search, setSearch] = useState("");

  return (
    <>
      <Filter search={search} onSearchChange={setSearch} />
      {/* Filtered items based on search */}
    </>
  );
}
```

### 3. Multiple Filters

Items are filtered by both category AND search text:
```jsx
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
```

### 4. Adding Items with Spread Operator

New items are added without mutating the original array:
```jsx
function handleItemFormSubmit(newItem) {
  setItems([...items, newItem]);  // Creates new array
}
```

### 5. Form Submission

Prevent default form behavior and handle data in React:
```jsx
function handleSubmit(event) {
  event.preventDefault();  // Prevent page reload
  
  const newItem = {
    id: uuid(),
    name: name,
    category: category,
  };
  
  onItemFormSubmit(newItem);  // Pass to parent
  
  // Reset form
  setName("");
  setCategory("Produce");
}
```

## Features Breakdown

### Search Filter
- Real-time filtering as user types
- Case-insensitive search
- Searches item names

### Category Filter
- Dropdown to filter by category
- Options: All, Produce, Dairy, Dessert
- Works alongside search filter

### Add New Items
- Controlled form inputs
- Validation through required fields
- Unique ID generation with UUID
- Form resets after submission

### Cart Toggle
- Each item can be added/removed from cart
- Visual indication with styling
- Local state per item

### Dark Mode
- Toggle between light and dark themes
- Persists across interactions
- Applied via CSS classes

## Testing

All tests passing:
- Controlled search input
- Search filtering functionality
- Controlled form inputs
- Form submission creates new items
- New items appear in list

Run tests:
```bash
npm test
```

## Lab Requirements Completed

### Filter Component
- Search input is a controlled component
- State for search text added to appropriate component
- Search text filters displayed items
- Uses `onSearchChange` callback prop

### ItemForm Component
- All inputs are controlled components
- Initial category state set to "Produce"
- Form submission prevented from default behavior
- New item created with uuid, name, and category
- Uses `onItemFormSubmit` callback prop
- Items added using spread operator (no mutation)

## Usage Examples

### Adding an Item
1. Type item name in "Name" field
2. Select category from dropdown
3. Click "Add to List"
4. Item appears in the list

### Searching Items
1. Type in search box
2. List filters in real-time
3. Case-insensitive matching

### Filtering by Category
1. Select category from dropdown
2. List shows only items in that category
3. Select "All" to show everything

### Combining Filters
1. Select a category
2. Type in search box
3. Items must match BOTH filters

## Author

**Shobinn Clark** - Full-Stack Software Engineering Student at Flatiron School

- GitHub: [@shobinn24](https://github.com/shobinn24)

## Learning Outcomes

This project demonstrates:
- Controlled components in React
- Form handling with preventDefault
- State management with useState
- Props and callbacks for communication
- Array filtering with multiple criteria
- Lifting state to appropriate components
- Immutable state updates with spread operator
- Component composition and reusability
- Event handling patterns

## License

This project was created as part of the Flatiron School Full-Stack Software Engineering curriculum.

## Acknowledgments

- Flatiron School for project requirements and test suite
- React documentation for best practices