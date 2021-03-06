{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
  };

  const opts = {
    tagSizes: {
      count: 8,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      titles: '.post-title',
      tags: '.post-tags .list',
      author: '.post-author',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

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

  const generateTitleLinks = function (customSelector = '') {

    console.log(customSelector);

    /* remove content of titleList */

    const titleList = document.querySelector(select.listOf.titles);

    console.log(titleList);

    function clearTitles() {
      titleList.innerHTML = '';
    }

    clearTitles();

    /* for each article */

    const articles = document.querySelectorAll(select.all.articles + customSelector);

    console.log(articles);

    let html = '';

    for (let article of articles) {

      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element */
      /* get the title from the title element */

      const articleTitle = article.querySelector(select.article.titles).innerHTML;

      /* create HTML of the link */

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

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
    const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);
    return opts.tagSizes.classPrefix + classNumber;
  };

  const generateTags = function () {

    /* create a new variable allTags with an empty object */

    let allTags = {};

    console.log(allTags);

    /* find all articles */

    const articles = document.querySelectorAll(select.all.articles);

    console.log(articles);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */

      const tagList = article.querySelector(select.article.tags);

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

        const linkHTMLData = {id: tag};
        const linkHTML = templates.tagLink(linkHTMLData);

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

    const tagList = document.querySelector(select.listOf.tags);

    const tagsParams = calculateTagsParams(allTags);

    console.log('tagsParams:', tagsParams);

    /* create variable for all links HTML code */

    const allTagsData = {
      tags: []
    };

    /* START LOOP: for each tag in allTags: */

    for (let tag in allTags) {

      /* generate code of a link and add it to allTagsHTML */

      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a> ' + '</li>';
      console.log('tagLinkHTML:', tagLinkHTML);

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

      /* END LOOP: for each tag in allTags: */

    }

    /* add HTML from allTagsHTML to tagList */

    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);

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

    const allTagLinks = document.querySelectorAll(select.all.linksTo.tags);

    /* START LOOP: for each link */

    for (let tagLink of allTagLinks) {

      /* add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */

    }

  };

  addClickListenersToTags();

  const generateAuthors = function () {

    /* create a new variable allAuthors with an empty object */

    let allAuthors = {};

    /* find all articles */

    const articles = document.querySelectorAll(select.all.articles);

    console.log(articles);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find authors wrapper */

      const authorList = article.querySelector(select.article.author);

      console.log(authorList);

      /* get author from data-author attribute */

      const author = article.getAttribute('data-author');

      /* generate HTML of the link */

      const linkHTMLData = {id: author};
      const linkHTML = templates.authorLink(linkHTMLData);

      /* check if this link is NOT already in allAuthors */

      if (!allAuthors[author]) {

        /* add generated code to allAuthors object */

        allAuthors[author] = 1;

      } else {
        allAuthors[author]++;
      }

      /* insert HTML of all the links into the authors wrapper */

      authorList.innerHTML = linkHTML;

      /* END LOOP: for every article: */

    }

    /* find list of authors in right column */

    const authorList = document.querySelector(select.listOf.authors);

    /* create variable for all links HTML code */

    let allAuthorsData = {
      authors: []
    };

    /* START LOOP: for each author in allAuthors: */

    for (let author in allAuthors) {

      /* generate code of a link and add it to allAuthorsHTML */

      const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + '</a> (' + allAuthors[author] + ') </li>';
      console.log('authorLinkHTML:', authorLinkHTML);

      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author]
      });

      /* END LOOP: for each tag in allAuthors: */

    }

    /* add HTML from allAuthorsHTML to authorList */

    authorList.innerHTML = templates.authorListLink(allAuthorsData);
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
