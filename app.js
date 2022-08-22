import { readFromLocalStorage, writeToLocalStorage } from "./scripts/utils.js";

// currently holds default values
let testArticleList = [
  {
    id: "a8eglaeoq761",
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
  },
  {
    id: "z86MOaDo87cP",
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
  },
];

export const initArticleStorage = () => {
  writeToLocalStorage("saved-articles-list", testArticleList);
};

const storeArticle = (newArticleObject) => {
  let currentArticles = fetchArticlesFromStorage();

  currentArticles = [...currentArticles, newArticleObject];
  writeToLocalStorage("saved-articles-list", currentArticles);
};

export const createNewArticle = (url) => {
  // handle fetching from the url, parsing the body of the html object

  let articleObject;

  saveArticle(articleObject);
};

export const fetchArticlesFromStorage = () => {
  return readFromLocalStorage("saved-articles-list");
};
