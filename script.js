const changeTextSizeBtns = document.querySelectorAll(".btn-change-text-size");
const showImagesBtn = document.querySelector("#btn-show-hide-images");
const showFavsBtn = document.querySelector("#btn-show-favs");
const searchBarInput = document.querySelector("#input-saved-article-search");

let markReadStatusBtns;

const savedArticlesDiv = document.querySelector("#saved-article-container");

// GLOBALS & CONSTANTS
let imagesAreRendered = true;
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
            <img src="" class="article-image"></img>
            <p class="article-graph">Within the favorites pane, you can then further customize your feed by marking or unmarking favorites as Read or remove them from your collection altogether.</p>
            <img src="" class="article-image"></img>
            <p class="article-graph">Enjoy! And, if you have any feedback, I'd <a class="article-link" href="mailto:charliesoandso@protonmail.com">love to hear it</a>.</p>
    `,
  snippet:
    "How to Use This App It's pretty straightfoward, actually. You can click the button to add this (or any other article) to your favorites.",
  imageURLs: ["./img/test.gif", "./img/test2.gif"],
  read: false,
};

let secondArticle = {
  title: "Another Article",
  author: "Test Dummy",
  urlLink: "https://minimum-viable.vercel.app/",
  body: `
          <h2 class="article-header">A Gripping, Not-At-All-Clickbaity Title</h2>
          <p class="article-graph">
             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non laborum dolorum voluptates quia alias inventore explicabo neque, esse suscipit iste quidem assumenda fugit aperiam maiores magnam quas nemo ad provident!
          </p>
          <p class="article-graph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id temporibus, illum quod amet adipisci tempore, doloremque corporis ratione mollitia a ipsa commodi. Minus aliquam quod natus atque sunt? Cupiditate, pariatur? Illum quod amet adipisci tempore, doloremque corporis ratione mollitia a ipsa commodi. Minus aliquam quod natus atque sunt? Cupiditate, pariatur?</p>
          
          <p class="article-graph">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem, enim. Minima voluptas quibusdam esse totam optio quae ex commodi repudiandae necessitatibus. Expedita totam ut perspiciatis tempora amet quo ullam. Architecto!</p>
          <img src="" class="article-image"></img>
  `,
  snippet:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non laborum dolorum voluptates",
  imageURLs: ["./img/test2.gif"],
  read: true,
};

// DUMMY DATA
let articleList = [introArticle, secondArticle];
let currentArticle = articleList[1];

showImagesBtn.addEventListener("click", () => {
  imagesAreRendered = !imagesAreRendered;
  console.log("current image state is", imagesAreRendered);

  handleShowImages();
});

showFavsBtn.addEventListener("click", () => handleShowFavs());
searchBarInput.addEventListener("keydown", (e) => handleSearchInputChanged(e));

window.addEventListener("DOMContentLoaded", () => {
  init();
});

const init = () => {
  handleTextSizeChange(defaultSize);
  displayArticle(currentArticle);
  layoutFavoritesList();
};

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

function handleShowFavs() {
  savedArticlesDiv.classList.toggle("visible");
  showFavsBtn.classList.toggle("active");
}

function checkArticleFavoriteStatus(buttonStatus) {
  const addIcon = `<i class="fa-solid fa-plus" title="Add article to Favorites"></i>`;
  const removeIcon = `<i class="fa-solid fa-minus" title="Remove article from Favorites"></i>`;

  return buttonStatus === "added" ? removeIcon : addIcon;
}

function handleShowImages() {
  // the presumption here is that the urls will be filled out on the server side, then utilized on the client side
  let currentImgSrcs = currentArticle.imageURLs.map((url) => url);
  let currentImages = Array.from(document.querySelectorAll("img"));

  if (imagesAreRendered === true) {
    showImagesBtn.classList.add("active");

    currentImages.forEach((img, index) =>
      img.setAttribute("src", currentImgSrcs[index])
    );
  }

  if (imagesAreRendered === false) {
    showImagesBtn.classList.remove("active");

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
  handleShowImages();
}

function layoutFavoritesList() {
  if (articleList.length === 0) {
    // console.log("empty articles");
    document.querySelector(".saved-articles-none").classList.add("visible");
  }

  if (articleList.length >= 1) {
    document.querySelector(".saved-articles-none").classList.remove("visible");

    let readArticles = articleList.filter((article) => article.read === true);
    let unreadArticles = articleList.filter(
      (article) => article.read === false
    );

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
    let markUnreadButtons = document.querySelectorAll(
      ".btn-saved-article.btn-mark-unread"
    );

    let markReadButtons = document.querySelectorAll(
      ".btn-saved-article.btn-mark-read"
    );

    let deleteButtons = document.querySelectorAll(
      ".btn-saved-article.btn-delete-fav"
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
    <div class="saved-article ${buttonStatusStr}">
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
    (article) => article.title === articleIdentifier
  );
  result.read = !result.read;
  console.log(articleList);
  layoutFavoritesList();
}

function handleDeleteArticle(articleIdentifier) {
  console.log(articleIdentifier);
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

  layoutFavoritesList();
  displayArticle(currentArticle);
}
