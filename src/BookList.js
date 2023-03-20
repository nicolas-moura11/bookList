import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: "2rem"
  },
  searchForm: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem"
  },
  searchInput: {
    flexGrow: 1,
    marginRight: "1rem"
  },
  resultsList: {
    listStyleType: "none",
    margin: 0,
    padding: 0
  },
  resultCard: {
    display: "flex",
    marginBottom: "1rem"
  },
  resultCardMedia: {
    width: "100px",
    height: "150px"
  },
  resultCardContent: {
    flexGrow: 1
  },
  resultCardActions: {
    display: "flex",
    alignItems: "center"
  },
  favoritesList: {
    listStyleType: "none",
    margin: 0,
    padding: 0
  },
  favoritesCard: {
    display: "flex",
    marginBottom: "1rem"
  },
  favoritesCardMedia: {
    width: "100px",
    height: "150px"
  },
  favoritesCardContent: {
    flexGrow: 1
  },
  favoritesCardActions: {
    display: "flex",
    alignItems: "center"
  }
});

const BookList = () => {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoritos"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favorites));
  }, [favorites]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const input = form.elements["search"];
    setQuery(input.value);
  };

  const handleAddToFavorites = (book) => {
    setFavorites([
      ...favorites,
      {
        ...book,
        rating: null,
        review: ""
      }
    ]);
  };

  const handleRemoveFromFavorites = (book) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== book.id
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        Book List
      </Typography>
      <form onSubmit={handleSubmit} className={classes.searchForm}>
        <TextField
          type="text"
          name="search"
          variant="outlined"
          label="Search Books"
          className={classes.searchInput}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      <Typography variant="h5" gutterBottom>
        Results
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              <CardMedia
                className={classes.bookCover}
                image={
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.thumbnail
                }
                title={book.volumeInfo.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {book.volumeInfo.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.volumeInfo.authors &&
                    book.volumeInfo.authors.join(", ")}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleAddToFavorites(book)}
                >
                  Add to Favorites
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" gutterBottom>
        Favorites
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              <CardMedia
                className={classes.bookCover}
                image={
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.thumbnail
                }
                title={book.volumeInfo.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {book.volumeInfo.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.volumeInfo.authors &&
                    book.volumeInfo.authors.join(", ")}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleRemoveFromFavorites(book)}
                >
                  Remove from Favorites
                </Button>
                <img
                  src={
                    book.volumeInfo.imageLinks &&
                    book.volumeInfo.imageLinks.thumbnail
                  }
                  alt={book.volumeInfo.title}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BookList;
