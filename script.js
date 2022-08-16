const changeTextSizeBtns = document.querySelectorAll(".btn-change-text-size");
const showImagesBtn = document.querySelector("#btn-show-hide-images");
const showFavsBtn = document.querySelector("#btn-show-favs");

let defaultSizeStr = "small";
let [defaultSize] = Array.from(changeTextSizeBtns).filter(
  (btn) => btn.getAttribute("data-size") === defaultSizeStr
);

let startingFontSize = parseInt(
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--font-size-default")
);

const savedArticlesDiv = document.querySelector("#saved-article-container");

// EVENT LISTENERS
changeTextSizeBtns.forEach((btn) =>
  btn.addEventListener("click", (e) =>
    handleTextSizeChange(e.target.parentElement)
  )
);

showImagesBtn.addEventListener("click", () => handleShowImages());
showFavsBtn.addEventListener("click", () => handleShowFavs());

// HANDLER FUNCTIONS
function handleTextSizeChange(button) {
  let size = button.getAttribute("data-size");
  toggleButtonState(button);
  let newSize;

  switch (size) {
    case "small":
      newSize = 16;
      break;
    case "medium":
      newSize = 24;
      break;
    case "large":
      newSize = 32;
      break;
  }

  document.documentElement.style.setProperty(
    "--font-size-default",
    `${newSize}px`
  );

  //   console.log("text is now", newSize, "px");
}

function toggleButtonState(activeBtn) {
  changeTextSizeBtns.forEach((btn) => {
    if (activeBtn.getAttribute("data-size") === btn.getAttribute("data-size")) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
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

window.addEventListener("DOMContentLoaded", () =>
  handleTextSizeChange(defaultSize)
);
