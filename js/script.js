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

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */

      const tagList = article.querySelector(optArticleTagsSelector);

      console.log(tagList);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      console.log(articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      console.log(articleTagsArray);

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {

        console.log(tag);

        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        console.log(linkHTML);

        /* add generated code to html variable */

        html = html + linkHTML;

        console.log(html);

        /* END LOOP: for each tag */

      }

      /* insert HTML of all the links into the tags wrapper */

      tagList.innerHTML = html;

      /* END LOOP: for every article: */

    }

  };

  generateTags();

  const tagClickHandler = function(event) {

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    console.log(tag);

    /* find all tag links with class active */

    /* START LOOP: for each active tag link */

    /* remove class active */

    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */

    /* START LOOP: for each found tag link */

    /* add class active */

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
  };

  const addClickListenersToTags = function() {

    /* find all links to tags */

    /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

    /* END LOOP: for each link */
  };

  addClickListenersToTags();

}
