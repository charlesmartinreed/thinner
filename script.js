import { readFromLocalStorage, writeToLocalStorage } from "./scripts/utils.js";
import {
  fetchArticlesFromStorage,
  createNewArticle,
  initArticleStorage,
} from "./app.js";

const changeTextSizeBtns = document.querySelectorAll(".btn-change-text-size");
const showImagesBtn = document.querySelector("#btn-show-hide-images");
const closeFavsMobileBtn = document.querySelector("#btn-close-favs-mobile");
const showFavsBtn = document.querySelector("#btn-show-favs");
const searchBarInput = document.querySelector("#input-saved-article-search");
const darkModeToggleBtn = document.querySelector("#btn-toggle-dark-mode");

const savedArticlesDiv = document.querySelector("#saved-article-container");

// GLOBALS & CONSTANTS
let clientIsMobileDisplay;
let appState;

// DUMMY DATA
let articleList;
let currentArticle;

// EVENT LISTENERS
darkModeToggleBtn.addEventListener("click", (e) => handleDarkModeChange(e));

changeTextSizeBtns.forEach((btn) =>
  btn.addEventListener("click", (e) =>
    handleTextSizeChange(e.target.parentElement)
  )
);

showImagesBtn.addEventListener("click", (e) => {
  handleShowImageBtnClicked();
});

showFavsBtn.addEventListener("click", () => handleShowFavs());
closeFavsMobileBtn.addEventListener("click", () => handleShowFavs());
searchBarInput.addEventListener("keydown", (e) => handleSearchInputChanged(e));

window.addEventListener("DOMContentLoaded", () => {
  init();
});

const init = () => {
  // defaults needed
  // dark mode
  // font size
  // images visible
  // article list

  const defaultState = {
    "thinner-initialized": true,
    "dark-mode-enabled": false,
    "images-are-rendered": true,
    "current-font-size": "small",
    "saved-articles-list": [],
  };

  appState = fetchStoredState();

  if (appState === null) {
    console.log("writing default state");
    appState = writeStateToLocalStorage(defaultState);
  } else {
    console.log("state is already written");
  }

  window.matchMedia("(max-width: 425px)").addEventListener("change", (e) => {
    clientIsMobileDisplay = e.matches;
    console.log("match changed", e.matches, clientIsMobileDisplay);
  });

  activateDarkMode();
  changeButtonSize();

  articleList = fetchArticlesFromStorage();
  if (articleList.length === 0) initArticleStorage();
  currentArticle = articleList[articleList.length - 1];

  displayArticle(currentArticle);
  layoutFavoritesList(articleList);
};

const writeStateToLocalStorage = (stateObject) => {
  for (let key of Object.keys(stateObject)) {
    console.log("writing key", key);
    writeToLocalStorage(key, stateObject[key]);
  }
};

const fetchStoredState = () => {
  let currentStateObj = Object.create(null);

  if (readFromLocalStorage("thinner-initialized") === true) {
    for (let key of Object.keys(window.localStorage)) {
      console.log("fetching state for key", key);
      currentStateObj[key] = readFromLocalStorage(key);
    }
  } else {
    return null;
  }

  return currentStateObj;
};

const updateCurrentState = (updatedStateObj) => {
  writeStateToLocalStorage(updatedStateObj);
  appState = fetchStoredState();
};

// HANDLER FUNCTIONS
const handleDarkModeChange = (e) => {
  let currentStateObj = fetchStoredState();
  currentStateObj["dark-mode-enabled"] = !currentStateObj["dark-mode-enabled"];

  updateCurrentState(currentStateObj);

  activateDarkMode();
};

const activateDarkMode = () => {
  let state = appState["dark-mode-enabled"] ?? false;

  let bgColor;
  let textColor;
  let savedArticlesContainerColor;
  let htmlElement = window.getComputedStyle(document.querySelector("html"));

  darkModeToggleBtn.classList.toggle("active", state === true);

  bgColor =
    state === true
      ? htmlElement.getPropertyValue("--color-dark-mode-body-bg")
      : htmlElement.getPropertyValue("--color-light-mode-body-bg");
  textColor =
    state === true
      ? htmlElement.getPropertyValue("--color-dark-mode-text-color")
      : htmlElement.getPropertyValue("--color-light-mode-text-color");
  savedArticlesContainerColor =
    state === true
      ? htmlElement.getPropertyValue(
          "--color-dark-mode-saved-articles-container-bg-color"
        )
      : htmlElement.getPropertyValue(
          "--color-light-mode-saved-articles-container-bg-color"
        );

  document.documentElement.style.setProperty(
    "--bg-color-default",
    `${bgColor}`
  );
  document.documentElement.style.setProperty(
    "--font-color-default",
    `${textColor}`
  );
  document.documentElement.style.setProperty(
    "--bg-color-saved-articles-default",
    `${savedArticlesContainerColor}`
  );
};

function handleTextSizeChange(e) {
  let newSize = e.getAttribute("data-size");

  let currentStateObj = fetchStoredState();
  currentStateObj["current-font-size"] = newSize;

  updateCurrentState(currentStateObj);

  changeButtonSize();
}

const changeButtonSize = () => {
  let state = appState["current-font-size"];
  let newSize;

  changeTextSizeBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-size") === state);
    // if (activeBtn.getAttribute("data-size") === btn.getAttribute("data-size")) {
    //   btn.classList.add("active");
    // } else {
    //   btn.classList.remove("active");
    // }
  });

  switch (state) {
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
};

function handleSearchInputChanged(e) {
  let searchInputText;

  let filteredArticles = articleList.filter(
    (article) => checkForMatch(article) === true
  );

  function checkForMatch(articleObject) {
    let articleTitleWords = articleObject.title.toLowerCase();
    searchInputText = e.target.value.toLowerCase();

    let inputTextLen = searchInputText.length;
    console.log("search text len is", searchInputText.length);

    let matched = false;
    let startPoint = articleTitleWords.indexOf(searchInputText.slice(0));

    if (startPoint !== -1) {
      for (
        let i = startPoint;
        i < articleTitleWords.length - inputTextLen;
        i++
      ) {
        let titleSliceStr = articleTitleWords.slice(i, i + inputTextLen);
        if (titleSliceStr === searchInputText) {
          matched = true;
        }
      }
    }
    return matched;
  }

  if (filteredArticles.length > 0) {
    layoutFavoritesList(filteredArticles);
  } else {
    layoutFavoritesList(articleList);
  }
}

function handleArticleFetch(url) {
  alert("fetching now");
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

const handleShowImageBtnClicked = () => {
  let state = fetchStoredState();
  state["images-are-rendered"] = !state["images-are-rendered"];
  updateCurrentState(state);

  displayImages();
};

function displayImages() {
  // the presumption here is that the urls will be filled out on the server side, then utilized on the client side

  let currentImgSrcs = currentArticle.imageURLs.map((url) => url);
  let currentImages = Array.from(document.querySelectorAll("img"));

  let imagesAreRendered = appState["images-are-rendered"];
  showImagesBtn.classList.toggle("active", imagesAreRendered);

  if (imagesAreRendered === true) {
    currentImages.forEach((img, index) =>
      img.setAttribute("src", currentImgSrcs[index])
    );
  }

  if (imagesAreRendered === false) {
    // showImagesBtn.classList.remove("active");

    currentImages.forEach((img, index) => img.setAttribute("src", ""));
  }
}

function displayArticle(article) {
  if (article === null) {
    let elements = document.querySelector(".article-attributions").childNodes;

    elements.forEach((element) => (element.innerHTML = ""));
    let link = document.querySelector(".article-attributions a");
    link.style = "display: none";

    document.querySelector(".article-body").innerHTML = `
    <h1 class="no-article-loaded">Let's get reading!</h1>
    `;
    return;
  }

  let { title, author, body, urlLink, read } = article;

  //   MIGHT CHANGE THIS BEHAVIOR IN THE FUTURE
  // UNDECIDED IF SIMPLY OPENING AN ARTICLE SHOULD ALSO MARK IT AS READ
  //   CONSIDER MARKING IT IF A CERTAIN AMOUNT IS READ, BY CHECKING THE PAGE SCROLL?
  //   article.read = true;

  const articleTitle = (document.querySelector(
    ".article-attributions .article-title"
  ).innerHTML = title);

  const articleAuthor = (document.querySelector(
    ".article-attributions .article-author"
  ).innerHTML = author);

  let articleLink = document.querySelector(".article-attributions a");
  articleLink.href = urlLink;
  articleLink.classList.add("article-link");
  articleLink.innerHTML = "Link to Article";

  const articleBodyParent = document.querySelector(".article-body");
  articleBodyParent.innerHTML = body;

  currentArticle = article;

  displayImages();
}

function layoutFavoritesList(list) {
  if (list.length === 0) {
    // console.log("empty articles");
    document.querySelector(".saved-articles-none").classList.add("visible");
  }

  if (list.length >= 1) {
    document.querySelector(".saved-articles-none").classList.remove("visible");

    let readArticles = list.filter((article) => article.read === true);
    let unreadArticles = list.filter((article) => article.read === false);

    let unreadArticleContainer = document.querySelector(
      ".saved-articles-unread"
    );
    let readArticleContainer = document.querySelector(".saved-articles-read");

    unreadArticleContainer.innerHTML = "";
    readArticleContainer.innerHTML = "";

    if (unreadArticles.length === 0)
      unreadArticleContainer.innerHTML = `<p class="saved-article-snippet" style="text-align: center">You're all caught up!</p>`;

    if (readArticles.length === 0)
      readArticleContainer.innerHTML = `<p class="saved-article-snippet" style="text-align: center">You're all caught up!</p>`;

    // display unread articles first

    unreadArticles.forEach((article) => {
      unreadArticleContainer.innerHTML += layoutArticlePanel(article);
    });

    readArticles.forEach((article) => {
      readArticleContainer.innerHTML += layoutArticlePanel(article);
    });

    // add event listeners to the buttons
    let articlePanes = document.querySelectorAll(".saved-article");

    let markUnreadButtons = document.querySelectorAll(
      ".btn-saved-article.btn-mark-unread"
    );

    let markReadButtons = document.querySelectorAll(
      ".btn-saved-article.btn-mark-read"
    );

    let deleteButtons = document.querySelectorAll(
      ".btn-saved-article.btn-delete-fav"
    );

    articlePanes.forEach((pane) =>
      pane.addEventListener("click", (e) => {
        let articleID = pane.getAttribute("data-article-id");
        articlePaneClicked(e.target, articleID);
      })
    );

    markUnreadButtons.forEach((btn) =>
      btn.addEventListener("click", () =>
        handleReadStatusChange(btn.getAttribute("data-article"))
      )
    );

    markReadButtons.forEach((btn) =>
      btn.addEventListener("click", () =>
        handleReadStatusChange(btn.getAttribute("data-article"))
      )
    );

    deleteButtons.forEach((btn) =>
      btn.addEventListener("click", () =>
        handleDeleteArticle(btn.getAttribute("data-article"))
      )
    );
  }
}

function layoutArticlePanel(article) {
  let { read: readStatus } = article;
  //   console.log("laid out title is", article.title);

  let buttonStatusStr = readStatus === true ? "unread" : "read";

  let html = `
    <div class="saved-article ${buttonStatusStr}" data-article-id=${article.id}>
      <div class="saved-article-left-pane">
        <p class="saved-article-title">${article.title}</p>
        <p class="saved-article-snippet">
            ${article.snippet}
        </p>
      </div>
      <div class="saved-article-right-pane">
        <button data-article="${article.title}" class="btn btn-saved-article btn-mark-${buttonStatusStr}">Mark as ${buttonStatusStr}</button>
        <button data-article="${article.title}" class="btn btn-saved-article btn-delete-fav">Remove From Favorites</button>
      </div>
    </div>
    `;

  return html;
}

function handleReadStatusChange(articleIdentifier) {
  // find the article that matches
  let [result] = articleList.filter(
    (article) => article.id === articleIdentifier
  );

  result.read = !result.read;
  layoutFavoritesList(articleList);
}

function handleDeleteArticle(articleIdentifier) {
  let pulledIndex;

  articleList = articleList.filter((article, index) => {
    pulledIndex = index;
    return article.title !== articleIdentifier;
  });

  currentArticle =
    articleList[pulledIndex + 1] ?? articleList[[pulledIndex - 1]] ?? null;

  //   init();

  console.log("removed index", pulledIndex);
  console.log("updated article list", articleList);
  console.log(currentArticle);
  //   currentArticle = articleList[pulledIndex + 1] ?? null;

  layoutFavoritesList(articleList);
  displayArticle(currentArticle);
}

function articlePaneClicked(target, articleID) {
  if (
    target.classList.contains("btn-mark-unread") ||
    target.classList.contains("btn-mark-read")
  ) {
    handleReadStatusChange(articleID);
    return;
  }

  if (target.parentElement.classList.contains("saved-article-left-pane")) {
    let [article] = articleList.filter((article) => article.id === articleID);
    currentArticle = article;

    displayArticle(currentArticle);

    // as the panes can only be clicked by user when the favs is open
    // triggering the toggle as well on mobile will avoid the user having to click the close button after choosing a new article
    if (clientIsMobileDisplay === true) {
      handleShowFavs();
    }
  }

  //   console.log(target.parentElement);
  //   let [article] = articleList.filter((article) => article.id === articleID);
  //   currentArticle = article;

  //   handleReadStatusChange(article.title);
  //   if (article.read === false) {
  //     handleReadStatusChange(article.title);
  //   }

  //   console.log("pane clicked, marked as read");
}
