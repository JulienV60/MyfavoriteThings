import express from "express";
import nunjucks from "nunjucks";
import { listMovies } from "./ListMovies";
import { listRealisteur } from "./ListRealisateur";
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/Movies", (request, response) => {
  response.render("Movies", { listMovies });
});

app.get("/Movies/:movieName", (request, response) => {
  const routeParameters = request.params;
  const movie = routeParameters.movieName;
  let realisateurr = "";

  listMovies.forEach((element) => {
    if (element.name === movie) {
      realisateurr = element.realisateur;
    }
  });

  response.render("Movies", { movie, listMovies, realisateurr });
});
app.get("/Movies/movieName/:realisateurName", (request, response) => {
  const routeParameters = request.params;
  const realisateurName = routeParameters.realisateurName;
  let realisateurrr = "";

  listRealisteur.forEach((element) => {
    if (element.realisateur === realisateurName) {
      realisateurrr = element.description;
    }
  });
  response.render("Movies", { realisateurName, listMovies, realisateurrr });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
