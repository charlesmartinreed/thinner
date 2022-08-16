const changeTextSizeBtns = document.querySelectorAll(".btn-change-text-size");
const showImagesBtn = document.querySelector("#btn-show-hide-images");
const showFavsBtn = document.querySelector("#btn-show-favs");
const searchBarInput = document.querySelector("#input-saved-article-search");

const savedArticlesDiv = document.querySelector("#saved-article-container");

// GLOBALS & CONSTANTS
let defaultSizeStr = "small";
let [defaultSize] = Array.from(changeTextSizeBtns).filter(
  (btn) => btn.getAttribute("data-size") === defaultSizeStr
);

// EVENT LISTENERS
changeTextSizeBtns.forEach((btn) =>
  btn.addEventListener("click", (e) =>
    handleTextSizeChange(e.target.parentElement)
  )
);

const introArticle = {
  title: "Welcome to Thinner!",
  author: "Charles Martin Reed",
  urlLink: "https://minimum-viable.vercel.app/",
  body: `
            <h2 class="article-header">How to Use This App</h2>
            <p class="article-graph">
                It's pretty straightfoward, actually. You can click the <i class="fa-solid fa-plus"></i> button to add this (or any other article) to your favorites. Or you can click the <i class="fa-solid fa-star"></i> to show your current favorites.
            </p>
            <img class="article-image visible" src="./img/test.gif"></img>
            <p class="article-graph">Within the favorites pane, you can then further customize your feed by marking or unmarking favorites as Read or remove them from your collection altogether.</p>
            <p class="article-graph">Enjoy! And, if you have any feedback, I'd <a class="article-link" href="mailto:charliesoandso@protonmail.com">love to hear it</a>.</p>
    `,
  snippet:
    "How to Use This App It's pretty straightfoward, actually. You can click the button to add this (or any other article) to your favorites.",
  imagesVisible: true,
  read: false,
};

// DUMMY DATA
let articleList = [introArticle];

showImagesBtn.addEventListener("click", () => handleShowImages());
showFavsBtn.addEventListener("click", () => handleShowFavs());
searchBarInput.addEventListener("keydown", (e) => handleSearchInputChanged(e));

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
}

function handleSearchInputChanged(e) {
  // attempting to exclude simple things like 'the', 'a', 'an' in titles
  if (e.target.value.length > 4) {
    console.log(e.target.value);
  }
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

function displayArticle(article) {
  let { title, author, body, urlLink, imagesVisible, read } = article;

  const articleTitle = (document.querySelector(
    ".article-attributions .article-title"
  ).innerHTML = title);

  const articleAuthor = (document.querySelector(
    ".article-attributions .article-author"
  ).innerHTML = author);

  const articleLink = (document.querySelector(
    ".article-attributions .article-link"
  ).href = urlLink);

  const articleBodyParent = document.querySelector(".article-body");
  articleBodyParent.innerHTML = body;
}

function layoutFavoritesList() {
  if (articleList.length === 0) {
    console.log("empty articles");
    document.querySelector(".saved-articles-none").classList.add("visible");
  }

  if (articleList.length >= 1) {
    console.log("drawing favorites now");
    document.querySelector(".saved-articles-none").classList.remove("visible");

    let readArticles = articleList.filter((article) => article.read === true);
    let unreadArticles = articleList.filter(
      (article) => article.read === false
    );

    let readArticleContainer = document.querySelector(".saved-articles-read");
    let unreadArticleContainer = document.querySelector(
      ".saved-articles-unread"
    );

    readArticles.forEach((article) => {
      readArticleContainer.innerHTML += layoutArticlePanel(article);
    });
    unreadArticles.forEach((article) => {
      unreadArticleContainer.innerHTML += layoutArticlePanel(article);
    });
  }
}

function layoutArticlePanel(article) {
  let { read: readStatus } = article;
  let buttonStatusStr = readStatus === true ? "unread" : "read";
  let html = `
    <div class="saved-article ${buttonStatusStr}">
      <div class="saved-article-left-pane">
        <p class="saved-article-title">${article.title}</p>
        <p class="saved-article-snippet">
            ${article.snippet}
        </p>
      </div>
      <div class="saved-article-right-pane">
        <button class="btn btn-saved-article btn-mark-${buttonStatusStr}">Mark as ${buttonStatusStr}</button>
        <button class="btn btn-saved-article btn-delete-fav">Remove From Favorites</button>
      </div>
    </div>
    `;
  return html;
}

window.addEventListener("DOMContentLoaded", () => {
  handleTextSizeChange(defaultSize);
  displayArticle(articleList[0]);
  layoutFavoritesList();
});
