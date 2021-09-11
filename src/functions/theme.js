const key = "social-media-theme";
const darkThemeId = "dark-theme-styles";
var styleSheet = document.getElementById(darkThemeId);

var styles = `
    :root,
    .posts,
    .profile,
    .explore,
    .qna-cont,
    #noResultsContainer,
    #singlePostPage,
    #qsPage,
    #qsHeading,
    #explorePage,
    #channelsHeading,
    #mostLikedPostsHeading,
    #mostCommentedPostsHeading,
    #mostAnsweredQueryHeading,
    #mostAnsweredQuerySwiperSlide,
    #initialLoading,
    #commentBox {
      color: #eee;
      background-color: #222831 !important;
    }
  
    #question,
    #tile,
    .posts .card {
      background-color: #353941  !important;
    }
  
    .posts .card .title {
      color: #eee;
    }
  
    .posts .card .subtitle {
      color: #aaa;
    }
  
    .posts .card .divider {
      background-color: dimgrey !important;
    }
  
    #question {
      border-color: dimgrey;
    }
  
    #mostLikedPostsSwiperSlide .card,
    #mostCommentedPostsSwiperSlide .card {
      color: lightgrey;
      background-color: #353941 !important;
    }
  
    #commentBox .comment-card {
      color: #eee;
      background-color: #353941 !important;
    }
    .qna-link,.back-content,.post-like {
      color: skyblue;
    }
  `;

export function setTheme() {
  const theme = localStorage.getItem(key);
  if (theme) {
    styleSheet.innerText = "";
    localStorage.removeItem(key);
    return false;
  } else {
    styleSheet.innerText = styles;
    localStorage.setItem(key, "dark");
    return true;
  }
}

export function loadTheme() {
  const theme = localStorage.getItem(key);
  if (theme) {
    styleSheet.innerText = styles;
  }
}
