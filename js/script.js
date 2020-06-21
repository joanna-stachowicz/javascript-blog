{
  'use strict';

  /*
        document.getElementById('test-button').addEventListener('click', function () {
            const links = document.querySelectorAll('.titles a');
            console.log('links:', links);
        });
        */

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    console.log(targetArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function () {

    /* remove content of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    console.log(titleList);

    function clearTitles() {
      titleList.innerHTML = '';
    }

    clearTitles();

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    console.log(articles);

    let html = '';

    for (let article of articles) {

      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element */
      /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      console.log(linkHTML);

      /* insert link into html variable */

      /* titleList.insertAdjacentHTML('beforeend', linkHTML); */

      html = html + linkHTML;

      console.log(html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  };

  generateTitleLinks();

  const generateTags = function () {

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    console.log(articles);

    let html = '';

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */

      const tagList = article.querySelector(optArticleTagsSelector);

      console.log(tagList);

      /* make html variable with empty string */

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      console.log(articleTags);

      /* split tags into array */

      /* START LOOP: foor each tag */

      /* generate HTML of the link */

      /* add generated code to html variable */

      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */

      /* END LOOP: for every article: */

    }

  };

  generateTags();

}
