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
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post .post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 8,
    optCloudClassPrefix = 'tag-size-';

  const generateTitleLinks = function (customSelector = '') {

    console.log(customSelector);

    /* remove content of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    console.log(titleList);

    function clearTitles() {
      titleList.innerHTML = '';
    }

    clearTitles();

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

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

  /* znalezienie najmniejszej i największej liczby wystąpień */
  const calculateTagsParams = function (tags) {
    const params = {
      max: 0,
      min: 999999
    };
    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  };

  /* Wybranie klasy dla tagu */
  const calculateTagClass = function (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  };

  const generateTags = function () {

    /* create a new variable allTags with an empty object */

    let allTags = {};

    console.log(allTags);

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    console.log(articles);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */

      const tagList = article.querySelector(optArticleTagsSelector);

      console.log(tagList);

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      console.log(articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      console.log(articleTagsArray);

      /* make html variable with empty string */

      let html = '';

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {

        console.log(tag);

        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        console.log(linkHTML);

        /* add generated code to html variable */

        html = html + linkHTML;

        console.log(html);

        /*check if this link is NOT already in allTags */

        if (!allTags[tag]) {

          /* add tag to allTags object */

          allTags[tag] = 1;

        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */

      }

      /* insert HTML of all the links into the tags wrapper */

      tagList.innerHTML = html;

      console.log('html poza pętlą:', html);

      /* END LOOP: for every article: */

    }

    /* find list of tags in right column */

    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);

    console.log('tagsParams:', tagsParams);

    /* create variable for all links HTML code */

    let allTagsHTML = '';

    /* START LOOP: for each tag in allTags: */

    for (let tag in allTags) {

      /* generate code of a link a nd add it to allTagsHTML */

      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a> ' + '</li>';
      console.log('tagLinkHTML:', tagLinkHTML);

      allTagsHTML += tagLinkHTML;

      /* END LOOP: for each tag in allTags: */

    }
    console.log(allTagsHTML);

    /* add HTML from allTagsHTML to tagList */

    tagList.innerHTML = allTagsHTML;

  };

  generateTags();

  const tagClickHandler = function (event) {

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

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */

    for (let activeTag of activeTags) {

      /* remove class active */

      activeTag.classList.remove('active');

      /* END LOOP: for each active tag link */

    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const targetTags = document.querySelectorAll('a[href="' + href + '"]');

    console.log(targetTags);

    /* START LOOP: for each found tag link */

    for (let targetTag of targetTags) {

      /* add class active */

      targetTag.classList.add('active');

      console.log(targetTag);

      /* END LOOP: for each found tag link */

    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  const addClickListenersToTags = function () {

    /* find all links to tags */

    const allTagLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */

    for (let tagLink of allTagLinks) {

      /* add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */

    }

  };

  addClickListenersToTags();

  const generateAuthors = function () {

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    console.log(articles);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find authors wrapper */

      const authorList = article.querySelector(optArticleAuthorSelector);

      console.log(authorList);

      /* get author from data-author attribute */

      const author = article.getAttribute('data-author');

      /* generate HTML of the link */

      const linkHTML = '<a href="#author-' + author + '">' + author + '</a>';

      /* insert HTML of all the links into the authors wrapper */

      authorList.innerHTML = linkHTML;

      /* END LOOP: for every article: */

    }

  };

  generateAuthors();

  const authorClickHandler = function (event) {

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    console.log(href); // #author-breakfast

    /* make a new constant "author" and extract author from the "href" constant */

    const author = href.replace('#author-', '');

    console.log(author); // breakfast

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');

  };

  const addClickListenersToAuthors = function () {

    /* find all links to authors */

    const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]');

    /* START LOOP: for each link */

    for (let authorLink of allAuthorLinks) {

      /* add authorClickHandler as event listener for that link */

      authorLink.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */

    }

  };

  addClickListenersToAuthors();

}
