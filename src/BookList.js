import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const BookList = () => {
const [books, setBooks] = useState([]);
const [query, setQuery] = useState("");
const [favorites, setFavorites] = useState([]);

useEffect(() => {
const fetchData = async () => {
  const result = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`
  );
setBooks(result.data.items);
};
if (query) {
fetchData();
}
}, [query]);

useEffect(() => {
const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
if (storedFavorites) {
setFavorites(storedFavorites);
}
}, []);

useEffect(() => {
localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

const handleSubmit = (event) => {
event.preventDefault();
const form = event.target;
const input = form.elements["search"];
setQuery(input.value);
};

const handleAddToFavorites = (book) => {
setFavorites([...favorites, book]);
};

const handleRemoveFromFavorites = (book) => {
setFavorites(favorites.filter((fav) => fav.id !== book.id));
};

return (
<div>
<h1>Book List</h1>
<form onSubmit={handleSubmit}>
<input type="text" name="search" />
<button type="submit">Search</button>
</form>
<h2>Results</h2>
<ul>
{books.map((book) => (
<li key={book.id}>
{book.volumeInfo.title}{" "}
<button onClick={() => handleAddToFavorites(book)}>
Add to Favorites
</button>
</li>
))}
</ul>
<h2>Favorites</h2>
<div className="favorite-list">
{favorites.map((book) => (
<div className="favorite-card" key={book.id}>
<button
className="remove-button"
onClick={() => handleRemoveFromFavorites(book)}
>
X
</button>
<h3 className="book-title">{book.volumeInfo.title}</h3>
<p className="book-author">
{book.volumeInfo.authors &&
book.volumeInfo.authors.join(", ")}
</p>
<img
src={
book.volumeInfo.imageLinks &&
book.volumeInfo.imageLinks.thumbnail
}
alt={book.volumeInfo.title}
/>
</div>
))}
</div>
</div>
);
};

export default BookList;