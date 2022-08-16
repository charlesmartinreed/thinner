const changeTextSizeBtn = document.querySelector("#btn-change-text-size");
const showImagesBtn = document.querySelector("#btn-show-hide-images");
const showFavsBtn = document.querySelector("#btn-show-favs");
let startingFontSize = parseInt(
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--font-size-default")
);
let currentFontSize = parseInt(startingFontSize);

const savedArticlesDiv = document.querySelector("#saved-article-container");

// EVENT LISTENERS
changeTextSizeBtn.addEventListener("click", () => handleTextSizeChange());

showImagesBtn.addEventListener("click", () => handleShowImages());

showFavsBtn.addEventListener("click", () => handleShowFavs());

// HANDLER FUNCTIONS
function handleTextSizeChange() {
  let proposedSize = (currentFontSize += 4);

  if (currentFontSize < startingFontSize * 2) {
    currentFontSize = proposedSize;
  } else {
    currentFontSize = startingFontSize;
  }

  document.documentElement.style.setProperty(
    "--font-size-default",
    `${proposedSize}px`
  );

  console.log("text is now", currentFontSize, "px");
}

function handleArticleFetch(url) {
  alert("fetching now");
}

function handleShowImages() {
  alert("displaying images now");
}

function handleShowFavs() {
  savedArticlesDiv.classList.toggle("visible");
  showFavsBtn.classList.toggle("active");
}

function checkArticleFavoriteStatus(buttonStatus) {
  const addIcon = `<i class="fa-solid fa-plus" title="Add article to Favorites"></i>`;
  const removeIcon = `<i class="fa-solid fa-minus" title="Remove article from Favorites"></i>`;

  return buttonStatus === "added" ? removeIcon : addIcon;
}
