import React from "react";
import ReactDOM from "react-dom";
import "./styles.css"; // importação do arquivo styles.css
import BookList from "./BookList";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <BookList />
  </React.StrictMode>,
  document.getElementById("root")
);
