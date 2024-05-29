import {
  state,
  loadRecipe,
  loadSearchedRecipe,
  getSearchPageResults,
  updateServings,
  addBookMark,
  deleteBookMark,
  uploadRecipe,
} from './model.js';
import recipeView from './recipefolder/recipeView.js';
import SearchedView from './recipefolder/searchedRecipeView.js';
import RecipeView from './recipefolder/recipeView.js';
import ResultsView from './recipefolder/resultsView.js';
import BookMarksView from './recipefolder/BookmarksView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import pagincationView from './recipefolder/pagincationView.js';
import addRecipeView from './recipefolder/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import BookmarksView from './recipefolder/BookmarksView.js';

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Loading data from API
    await loadRecipe(id);
    const { recipe } = state;
    console.log(recipe);
    RecipeView.renderSpinner();

    ResultsView.update(getSearchPageResults());
    // Rendering data of that API
    RecipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    // Get query
    const query = SearchedView.getQuery();
    if (!query) return;

    // Fetch query results
    await loadSearchedRecipe(query);

    // render query results
    ResultsView.render(getSearchPageResults());

    // Render initial pagination
    pagincationView.render(state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = function (goToPage) {
  // render query results
  ResultsView.render(getSearchPageResults(goToPage));

  // Render initial pagination
  pagincationView.render(state.search);
};

const controlServings = function (newServings) {
  updateServings(newServings);
  // recipeView.render(state.recipe);
  recipeView.update(state.recipe);
  console.log(state.recipe.servings);
};

const controlAddBookMark = function () {
  console.log(state.recipe);
  if (!state.recipe.isBookMarked) addBookMark(state.recipe);
  else deleteBookMark(state.recipe.id);
  recipeView.update(state.recipe);

  BookMarksView.render(state.bookmarks);
};

const controlBookMarks = function () {
  BookMarksView.render(state.bookmarks);
};

const controlAddNewRecipe = async function (newRecipe) {
  try {
    recipeView.renderSpinner();

    await uploadRecipe(newRecipe);

    recipeView.render(state.recipe);

    recipeView.renderMessage();

    BookmarksView.render(state.bookmarks);

    window.history.pushState(null, '', state.recipe.id);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  BookMarksView.addHandlerRender(controlBookMarks);
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerToUpdateServings(controlServings);
  SearchedView.addSearchQueryHandler(controlSearchResults);
  pagincationView.addbuttonhandler(controlPagination);
  recipeView.addHandlerToAddBookMark(controlAddBookMark);
  addRecipeView.addHandlerUpload(controlAddNewRecipe);
};

init();
