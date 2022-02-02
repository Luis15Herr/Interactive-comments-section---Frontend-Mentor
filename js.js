fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    datos = data;
    if (sessionStorage.getItem("comments")) {
      let test = JSON.parse(sessionStorage.getItem("comments"));
      comments = test;
    } else {
      comments = datos.comments;
    }
    currentUser = datos.currentUser;
    ////////////////////////////////////////////
    sortByScore();
    buildComments();
    addBtns();
    createCommentInput();
    textboxCommentListener();
    getTimeAgo();
  });

let db = sessionStorage;

function buildComments() {
  let n = 0;
  comments.forEach((item) => {
    if (item.user.username === currentUser.username) {
      option = `<div class='comment__options'>
        <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
        <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
        </div>`;
      you = `<span class='comment__logged-indicator'>you</span>`;
      optionMobile = `<div class='comment__options comment__options--mobile'>
        <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
        <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
        </div>`;
    } else {
      option = `<div class="comment__options">
        <span class="comment__btn reply-btn"><img src="./images/icon-reply.svg" alt="Reply btn">Reply</span>
        </div>`;
      you = ``;
      optionMobile = `<div class="comment__options comment__options--mobile">
        <span class="comment__btn reply-btn"><img src="./images/icon-reply.svg" alt="Reply btn">Reply</span>
        </div>`;
    }

    html = `<div class="comment" data-id="${item.id}">
    <div class="comment__wrapper wrapper" >
    <div class="comment__score">
    <button class='comment__score-icon comment__score-item upvote' src="./images/icon-plus.svg" alt="PLUS BTN">
    <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
    </button> <span class='comment__score-number'>${item.score}</span> 
    <button class='comment__score-icon comment__score-item downvote' src="./images/icon-minus.svg" alt="MINUS BTN">
    <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
    </button>
    </div>
    ${optionMobile}
    <div class="inner__comment">
      <div class="comment__top-section">
        <div class="comment__profile">
          <img class="comment__profile-img" src="${
            item.user.image.png
          }" alt="User image" />  
          <span class="comment__profile-name"> ${item.user.username}</span>
          ${you}
          <span class="comment__createdAt-info">${item.createdAt}</span>
        </div>
       ${option}
      </div>
      <div class="comment__text">
        ${detectTag(item.content)}
      </div>
    </div>
    </div>
  </div>`;

    document.querySelector(".comments__section").innerHTML += html;
    if (item.replies.length != 0) {
      item.replies.forEach((reply) => {
        if (reply.user.username === currentUser.username) {
          option = `<div class='comment__options'>
          <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
          <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
          </div>`;
          you = `<span class='comment__logged-indicator'>you</span>`;
          optionMobile = `<div class='comment__options comment__options--mobile'>
          <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
          <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
          </div>`;
        } else {
          option = `<div class="comment__options">
          <span class="comment__btn reply-btn"><img src="./images/icon-reply.svg" alt="Reply btn">Reply</span>
          </div>`;
          you = ``;
          optionMobile = `<div class="comment__options comment__options--mobile">
          <span class="comment__btn reply-btn"><img src="./images/icon-reply.svg" alt="Reply btn">Reply</span>
          </div>`;
        }

        replies = `<div class="reply" data-id="${reply.id}">
        <div class="reply__wrapper wrapper">
        <div class="comment__score">
        <button class='comment__score-icon comment__score-item upvote' src="./images/icon-plus.svg" alt="PLUS BTN">
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
        </button> <span class='comment__score-number'>${reply.score}</span> 
        <button class='comment__score-icon comment__score-item downvote' src="./images/icon-minus.svg" alt="MINUS BTN">
        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
        </button>
        </div>
      ${optionMobile}
      <div class="inner__comment">
        <div class="comment__top-section">
          <div class="comment__profile">
            <img class="comment__profile-img" src="${
              reply.user.image.png
            }" alt="User image" />
            <span class="comment__profile-name"> ${reply.user.username}</span>
            ${you}
            <span class="comment__createdAt-info">${reply.createdAt}</span>
          </div>
          ${option}
        </div>
        <div class="comment__text">
          ${detectTag(reply.content)}
        </div>
      </div>
      </div>
    </div>`;
        document.querySelectorAll(".comment")[n].innerHTML += replies;
      });
    }
    n++;
  });
}
function buildReply() {
  let reply = comments[indexOfCommentF].replies.at(-1);

  replies = `<div class="reply new-reply" data-id="${reply.id}">
  <div class="reply__wrapper wrapper">
  <div class="comment__score">
  <button class='comment__score-icon comment__score-item upvote' src="./images/icon-plus.svg" alt="PLUS BTN">
  <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
  </button> <span class='comment__score-number'>${reply.score}</span> 
  <button class='comment__score-icon comment__score-item downvote' src="./images/icon-minus.svg" alt="MINUS BTN">
  <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
  </button>
  </div>
      <div class='comment__options comment__options--mobile'>
          <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
          <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
          </div>
      <div class="inner__comment">
        <div class="comment__top-section">
          <div class="comment__profile">
          <img class="comment__profile-img" src="${
            reply.user.image.png
          }" alt="" />
          <span class="comment__profile-name"> ${reply.user.username}</span>
          <span class='comment__logged-indicator'>you</span>
          <span class="comment__createdAt-info">${reply.createdAt}</span>
          </div>
          <div class='comment__options'>
            <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
            <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
            </div>
        </div>
        <div class="comment__text">
          ${detectTag(reply.content)}
        </div>
      </div>
      </div>
    </div>`;
  document.querySelector(`[data-id='${idOfCommentF}']`).innerHTML += replies;
  addBtns();
  buildDeleteBtn();
}
function buildComment() {
  let comment = comments.at(-1);
  html = `<div class="comment" data-id="${comment.id}">
  <div class="comment__wrapper wrapper">
  <div class="comment__score">
  <button class='comment__score-icon comment__score-item upvote' src="./images/icon-plus.svg" alt="PLUS BTN">
  <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
  </button> <span class='comment__score-number'>${comment.score}</span> 
  <button class='comment__score-icon comment__score-item downvote' src="./images/icon-minus.svg" alt="MINUS BTN">
  <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
  </button>
  </div>
      <div class='comment__options comment__options--mobile'>
          <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
          <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
          </div>
      <div class="inner__comment">
        <div class="comment__top-section">
          <div class="comment__profile">
          <img class="comment__profile-img" src="${
            comment.user.image.png
          }" alt="User image" />
          <span class="comment__profile-name"> ${comment.user.username}</span>
          <span class='comment__logged-indicator'>you</span>

          <span class="comment__createdAt-info">${comment.createdAt}</span>
          </div>
          <div class='comment__options'>
            <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
            <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
            </div>
        </div>
        <div class="comment__text">
          ${detectTag(comment.content)}
        </div>
      </div>
      </div>
    </div>`;
  document.querySelector(".comments__section").innerHTML += html;
  addBtns();
  buildDeleteBtn();
}

let lastesId; // Save the biggest id of comments and corresponding function
function lastId() {
  let biggestCommentId = 0;
  let biggestReplyId = 0;
  for (let coment of comments) {
    if (coment.id > biggestCommentId) {
      biggestCommentId = coment.id;
    }
    for (let reply of coment.replies) {
      if (reply.id > biggestReplyId) {
        biggestReplyId = reply.id;
      }
    }
  }

  if (biggestReplyId > biggestCommentId) {
    lastesId = biggestReplyId;
  } else {
    lastesId = biggestCommentId;
  }
  lastesId++;
  return lastesId;
}

function detectTag(text) {
  let inputSplit = text.split(" ");
  for (let i = 0; i < inputSplit.length; i++) {
    if (inputSplit[i].includes("@")) {
      if (inputSplit[i].includes("@") && inputSplit[0].trim().length > 0) {
        html = `<span class='comment__replyingTo'>${inputSplit[i]}</span>`;
        inputSplit[i] = html;
      }
    }
  }
  textAnalized = inputSplit.join(" ");
  return textAnalized;
}

function createComment(content) {
  let comment = new Object();
  comment.id = lastId();
  comment.content = content;
  comment.createdAt = Date.now();
  comment.score = 0;
  comment.user = {
    image: {
      png: currentUser.image.png,
    },
    username: currentUser.username,
  };
  comment.replies = [];
  document.querySelector("#sendComment").value = "";

  return comment;
}

function pushComment() {
  let inputComment = document.querySelector("#sendComment").value;
  if (inputComment != "") {
    comments.push(createComment(inputComment));
    buildComment();
    getTimeAgo();
  }
  document.querySelector("#sendComment").blur();
  db.setItem("comments", JSON.stringify(comments));
}

function createReply(content) {
  let reply = new Object();
  reply.id = lastId();
  reply.content = content;
  reply.createdAt = Date.now();
  reply.score = 0;
  reply.user = {
    image: {
      png: currentUser.image.png,
    },
    username: currentUser.username,
  };
  reply.replyingTo = document.querySelector(
    `[data-id='${idElementSelected}'] .comment__profile-name`
  ).innerText;
  document.querySelector("#textboxReply").value = "";
  return reply;
}

function textboxCommentListener() {
  let textbox = document.querySelector("#sendComment");
  let btn = document.querySelector("#commentBtn");

  textbox.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      pushComment();
    }
  });
  btn.addEventListener("click", pushComment);
}

let indexOfCommentF;
let idOfCommentF;

function pushReply() {
  let textboxReply = document.querySelector("#textboxReply").value;
  if (textboxReply === "") {
    document.querySelector(".input__section").remove();
  }
  for (coment of comments) {
    if (coment.id === idElementSelected) {
      indexOfCommentF = comments.indexOf(coment);
      idOfCommentF = parseInt(coment.id);
    }
    for (reply of coment.replies) {
      if (reply.id === idElementSelected) {
        indexOfCommentF = comments.indexOf(coment);
        idOfCommentF = parseInt(coment.id);
      }
    }
  }
  comments[indexOfCommentF].replies.push(createReply(textboxReply));
  buildReply();
  buildDeleteBtn();
  document.querySelector(".input__section").remove();
  getTimeAgo();
  save();
}

function replyEnter(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    pushReply();
  }
}

function addReplyInput() {
  if (document.querySelector(".input__section--reply")) {
    document.querySelector(".input__section--reply").remove();
  }

  let html = `
  <div class="input__section input__section--reply">
  <img class='profile__img' src="${currentUser.image.png}" alt="Current User Image" />
  <textarea class="textarea" role="textbox" id="textboxReply" contenteditable></textarea>
  <button class="primary-btn" id='textboxReplyBtn'>REPLY</button>
  </div>`;

  document
    .querySelector(`[data-id='${parseInt(idElementSelected)}']`)
    .insertAdjacentHTML("afterend", html);
  for (comment of comments) {
    for (reply of comment.replies) {
      if (idElementSelected === reply.id) {
        document.querySelector(".input__section").classList.add("input--reply");
      }
    }
  }
  document
    .querySelector("#textboxReply")
    .addEventListener("keydown", replyEnter);
  document
    .querySelector("#textboxReplyBtn")
    .addEventListener("click", pushReply);

  if (document.querySelector(".update")) {
    document.querySelector(".update").addEventListener("click", pushReply);
  }
}

function createCommentInput() {
  let html = `<div class="input__section input__section-main">
  <img
    class="profile__img"
    src="${currentUser.image.png}"
    alt="Current User Image"
  />
  <textarea
    class="textarea"
    role="textbox"
    id="sendComment"
    placeholder="Add a comment..."
    contenteditable
  ></textarea>
  <button id="commentBtn" class="primary-btn">SEND</button>
</div>`;
  document.querySelector(".comments__input-container").innerHTML = html;
}

function addBtns() {
  buildDeleteBtn();

  let upvoteBtns = document.querySelectorAll(".upvote");
  upvoteBtns.forEach((icon) => {
    icon.addEventListener("click", function () {
      setTimeout(function () {
        upVote();
      }, 1);
    });
  });

  let downvoteBtns = document.querySelectorAll(".downvote");
  downvoteBtns.forEach((icon) => {
    icon.addEventListener("click", function () {
      setTimeout(function () {
        downVote();
      }, 1);
    });
  });

  let getIdTest = document.querySelectorAll(".wrapper");
  getIdTest.forEach((item) => {
    item.addEventListener("click", getIdFromElement);
  });

  let replyBtns = document.querySelectorAll(".reply-btn");
  replyBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      setTimeout(function () {
        replyTo();
      }, 1);
    });
  });

  let edit = document.querySelectorAll(".edit-btn");
  edit.forEach((btn) => {
    btn.addEventListener("click", function () {
      setTimeout(function () {
        isEditing();
      }, 1);
    });
  });
}
function getIdFromElement(e) {
  idElementSelected = parseInt(e.currentTarget.parentNode.dataset.id);
}

function upVote() {
  let commentToLike = idElementSelected;
  let numberHTML = document.querySelector(
    `[data-id='${commentToLike}'] .comment__score-number`
  );
  for (comment of comments) {
    if (comment.id === parseInt(commentToLike)) {
      comment.score++;
      numberHTML.innerHTML = comment.score;
    }
    for (reply of comment.replies) {
      if (reply.id === commentToLike) {
        reply.score++;
        numberHTML.innerHTML = reply.score;
      }
    }
  }
  save();
  sortByScore();
}

function downVote() {
  let commentToDislike = idElementSelected;
  let numberHTMLO = document.querySelector(
    `[data-id='${commentToDislike}'] .comment__score-number`
  );
  for (comment of comments) {
    if (comment.id === parseInt(commentToDislike)) {
      comment.score--;
      numberHTMLO.innerHTML = comment.score;
    }
    for (replies of comment.replies) {
      if (replies.id === parseInt(commentToDislike)) {
        replies.score--;
        numberHTMLO.innerHTML = replies.score;
      }
    }
  }
  save();
  sortByScore();
}

//Reply trigger
let idElementSelected; //Save id to comment to reply
function replyTo(e) {
  addReplyInput();
  let textbox = document.querySelector("#textboxReply");
  textbox.value =
    "@" +
    document.querySelector(
      `[data-id='${idElementSelected}'] .comment__profile-name`
    ).innerText;
  textbox.focus();
}
//Active edit mode
function isEditing(e) {
  addBtns();
  if (document.querySelector(".editionWrapper")) {
    document.querySelector(".editionWrapper").remove();
  }
  let commentText = document.querySelector(
    `[data-id='${idElementSelected}'] .comment__text`
  );
  idElement = idElementSelected;

  for (comment of comments) {
    if (comment.id === parseInt(idElement)) {
      elementToEditId = comment.id;
      content = comment.content;
    }
    for (reply of comment.replies) {
      if (reply.id === parseInt(idElement)) {
        elementToEditId = reply.id;
        content = reply.content;
      }
    }
  }

  commentText.classList.add("isEditing");
  let html = `<div class='editionWrapper'>
  <textarea class="textarea" role="textbox" id="textboxEditing" contenteditable>${content}</textarea>
  <button class="primary-btn update">UPDATE</button> </div>`;
  commentText.insertAdjacentHTML("afterend", html);
  buildUpdateBtn();
  document
    .querySelector("#textboxEditing")
    .addEventListener("keypress", updateOnEnter);
}

let elementToEditId; //Save id of the element selected to edit
function buildUpdateBtn() {
  let updateBtn = document.querySelector(".update");
  updateBtn.addEventListener("click", update);
}

//Function update, only work with click START
function update(e) {
  let commentText = document.querySelector(
    `[data-id='${idElementSelected}'] .comment__text`
  );
  let textbox = document.querySelector("#textboxEditing");

  for (comment of comments) {
    if (comment.id === elementToEditId) {
      comment.content = textbox.value;
      document.querySelector(
        `[data-id='${elementToEditId}'] .inner__comment .comment__text`
      ).innerHTML = detectTag(comment.content);
    }
    for (reply of comment.replies) {
      if (reply.id === elementToEditId) {
        reply.content = textbox.value;
        document.querySelector(
          `[data-id='${elementToEditId}'] .inner__comment .comment__text`
        ).innerHTML = detectTag(reply.content);
      }
    }
  }
  buildDeleteBtn();
  commentText.classList.remove("isEditing");
  document.querySelector(".editionWrapper").remove();
  save();
}

function updateOnEnter(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    update(e);
  }
}
//Same function that update, but only works with enter END

//DELETE BTNS CREATION AND FUNCTION START
function buildDeleteBtn() {
  let deleteBtns = document.querySelectorAll(".delete-btn");
  if (!deleteBtns) return;
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      setTimeout(function () {
        showDeleteModal();
      }, 1);
    });
  });
}
function showDeleteModal() {
  let overlay = document.querySelector(".overlay");
  overlay.classList.add("overlay--show");
  document
    .querySelector(".modal__btn--cancel")
    .addEventListener("click", function () {
      overlay.classList.remove("overlay--show");
    });
  document
    .querySelector(".modal__btn--delete")
    .addEventListener("click", function () {
      deleteBtn();
      overlay.classList.remove("overlay--show");
    });
}

function deleteBtn() {
  for (comment of comments) {
    if (comment.id === idElementSelected) {
      document.querySelector(`[data-id='${idElementSelected}']`).remove();
      let indexToDelete = comments.indexOf(comment);
      comments.splice(indexToDelete, 1);
    }
    for (reply of comment.replies) {
      if (reply.id === idElementSelected) {
        document.querySelector(`[data-id='${idElementSelected}']`).remove();
        let indexToDelete = comment.replies.indexOf(reply);
        comment.replies.splice(indexToDelete, 1);
      }
    }
  }
  save();
}
//DELETE BTNS CREATION AND FUNCTION END

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) <= 1
      ? Math.floor(interval) + " year ago"
      : Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) <= 1
      ? Math.floor(interval) + " month ago"
      : Math.floor(interval) + " monts ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) <= 1
      ? Math.floor(interval) + " day ago"
      : Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) <= 1
      ? Math.floor(interval) + " hour ago"
      : Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) <= 1
      ? Math.floor(interval) + " minute ago"
      : Math.floor(interval) + " minutes ago";
  }
  return /* Math.floor(seconds)  */ "a few seconds ago";
}

function getTimeAgo() {
  for (comment of comments) {
    if (typeof comment.createdAt === "number") {
      dateAgo = (Date.now() - comment.createdAt) / 1000;
      document.querySelector(
        `[data-id='${comment.id}'] .comment__createdAt-info`
      ).innerHTML = timeSince(comment.createdAt);
    }
    for (reply of comment.replies) {
      if (typeof reply.createdAt === "number") {
        dateAgo = (Date.now() - reply.createdAt) / 1000;
        document.querySelector(
          `[data-id='${reply.id}'] .comment__createdAt-info`
        ).innerHTML = timeSince(reply.createdAt);
      }
    }
  }
}
setInterval(function () {
  getTimeAgo();
}, 30000);

function sortByScore() {
  comments.sort((item, lastitem) => {
    return lastitem.score - item.score;
  });

  let htmlComments = document.querySelectorAll(".comment");
  htmlComments.forEach((comment) => {
    index = comments.findIndex((item) => {
      return item.id === parseInt(comment.dataset.id);
    });
    comment.style.order = index;
  });
}

function save() {
  db.setItem("comments", JSON.stringify(comments));
}
