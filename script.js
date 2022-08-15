const searchBtn = document.querySelector("#btn-search");
const addRemoveToFavsBtn = document.querySelector("#btn-add-remove-fav");
const showFavsBtn = document.querySelector("#btn-show-favs");

// EVENT LISTENERS
searchBtn.addEventListener("click", () => handleArticleFetch());

addRemoveToFavsBtn.addEventListener("click", (e) =>
  handleFavoriteButtonClicked(e.target.getAttribute("data-added-status"))
);

showFavsBtn.addEventListener("click", () => handleShowFavs());

// HANDLER FUNCTIONS
function handleArticleFetch(url) {
  alert("fetching now");
}

function handleFavoriteButtonClicked(buttonStatus) {
  //   update Button
  addRemoveToFavsBtn.innerHTML = checkArticleFavoriteStatus(buttonStatus);
}

function handleShowFavs() {
  alert("showing favs");
}

function checkArticleFavoriteStatus(buttonStatus) {
  const addIcon = `<i class="fa-solid fa-plus" title="Add article to Favorites"></i>`;
  const removeIcon = `<i class="fa-solid fa-minus" title="Remove article from Favorites"></i>`;

  return buttonStatus === "added" ? removeIcon : addIcon;
}

// PLACEHOLDER; won't need to hard check this at every page load, probably.
window.addEventListener("DOMContentLoaded", () =>
  handleFavoriteButtonClicked(
    addRemoveToFavsBtn.getAttribute("data-added-status")
  )
);
