fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    datos = data;
    comments = datos.comments;
    currentUser = datos.currentUser;
    ////////////////////////////////////////////
    buildComments();
    addBtns();
    createCommentInput();
    textboxCommentListener();
  });

function buildComments() {
  let n = 0;
  comments.forEach((item) => {
    html = `<div class="comment" data-id="${item.id}">
    <div class="comment__wrapper wrapper" >

    <div class="comment__score">
    <img class='comment__score-icon comment__score-item upvote' src="./images/icon-plus.svg" alt="PLUS BTN"> <span class='comment__score-number'>${item.score}</span> <img class='comment__score-icon comment__score-item downvote' src="./images/icon-minus.svg" alt="MINUS BTN">
    </div>
    <div class="comment__options comment__options--mobile">
          <span class="comment__btn reply-btn"><img src="./images/icon-reply.svg" alt="Reply btn">Reply</span>
        </div>
    <div class="inner__comment">
      <div class="comment__top-section">
        <div class="comment__profile">
          <img class="comment__profile-img" src="${item.user.image.png}" alt="" />
          <span class="comment__profile-name"> ${item.user.username}</span>
          <span class="comment__createdAt-info">${item.createdAt}</span>
        </div>
        <div class="comment__options">
          <span class="comment__btn reply-btn"><img src="./images/icon-reply.svg" alt="Reply btn">Reply</span>
        </div>
      </div>
      <div class="comment__text">
        ${item.content}
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
          optionMobile = `<div class='comment__options comment__options--mobile'>
          <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
          <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
          </div>`;
        } else {
          option = `<div class="comment__options">
          <span class="comment__btn reply-btn"><img src="./images/icon-reply.svg" alt="Reply btn">Reply</span>
          </div>`;

          optionMobile = `<div class="comment__options comment__options--mobile">
          <span class="comment__btn reply-btn"><img src="./images/icon-reply.svg" alt="Reply btn">Reply</span>
          </div>`;
        }

        replies = `<div class="reply" data-id="${reply.id}">
        <div class="reply__wrapper wrapper">
      <div class="comment__score">
      <img class='comment__score-icon comment__score-item upvote' src="./images/icon-plus.svg" alt="PLUS BTN"> <span class='comment__score-number'>${reply.score}</span> <img class='comment__score-icon comment__score-item downvote' src="./images/icon-minus.svg" alt="MINUS BTN">
      </div>
      ${optionMobile}
      <div class="inner__comment">
        <div class="comment__top-section">
          <div class="comment__profile">
            <img class="comment__profile-img" src="${reply.user.image.png}" alt="" />
            <span class="comment__profile-name"> ${reply.user.username}</span>
            <span class="comment__createdAt-info">${reply.createdAt}</span>
          </div>
          ${option}
        </div>
        <div class="comment__text">
        <span class='comment__replyingTo'>@${reply.replyingTo}</span>
          ${reply.content}
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
      <img class='comment__score-icon comment__score-item upvote' src="./images/icon-plus.svg" alt="PLUS BTN"> <span class='comment__score-number'>${reply.score}</span> <img class='comment__score-icon comment__score-item downvote' src="./images/icon-minus.svg" alt="MINUS BTN">
      </div>
      <div class='comment__options comment__options--mobile'>
          <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
          <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
          </div>
      <div class="inner__comment">
        <div class="comment__top-section">
          <div class="comment__profile">
          <img class="comment__profile-img" src="${reply.user.image.png}" alt="" />
          <span class="comment__profile-name"> ${reply.user.username}</span>
          <span class="comment__createdAt-info">${reply.createdAt}</span>
          </div>
          <div class='comment__options'>
            <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
            <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
            </div>
        </div>
        <div class="comment__text">
        <span class='comment__replyingTo'>@${reply.replyingTo}</span>
          ${reply.content}
        </div>
      </div>
      </div>
    </div>`;
  document.querySelector(`[data-id='${idOfCommentF}']`).innerHTML += replies;
  addBtns();
  buildDeleteBtn();
  console.table(comments[indexOfCommentF].replies);
}

function buildComment() {
  let comment = comments.at(-1);
  html = `<div class="comment" data-id="${comment.id}">
  <div class="comment__wrapper wrapper">
      <div class="comment__score">
      <img class='comment__score-icon comment__score-item upvote' src="./images/icon-plus.svg" alt="PLUS BTN"> <span class='comment__score-number'>${comment.score}</span> <img class='comment__score-icon comment__score-item downvote' src="./images/icon-minus.svg" alt="MINUS BTN">
      </div>
      <div class='comment__options comment__options--mobile'>
          <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
          <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
          </div>
      <div class="inner__comment">
        <div class="comment__top-section">
          <div class="comment__profile">
          <img class="comment__profile-img" src="${comment.user.image.png}" alt="" />
          <span class="comment__profile-name"> ${comment.user.username}</span>
          <span class="comment__createdAt-info">${comment.createdAt}</span>
          </div>
          <div class='comment__options'>
            <span class="comment__btn delete-btn"><img src="./images/icon-delete.svg" alt="Edit btn">Delete</span>
            <span class="comment__btn edit-btn"><img src="./images/icon-edit.svg" alt="Edit btn">Edit</span>
            </div>
        </div>
        <div class="comment__text">
          ${comment.content}
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

function createComment(content) {
  let comment = new Object();
  comment.id = lastId();
  comment.content = content;
  comment.createdAt = "1 week ago";
  comment.score = 0;
  comment.user = {
    image: {
      png: currentUser.image.png,
    },
    username: currentUser.username,
  };
  comment.replies = [];
  document.querySelector("#sendComment").innerText = "";
  return comment;
}

function pushComment() {
  let inputComment = document.querySelector("#sendComment").innerText;
  comments.push(createComment(inputComment));
  buildComment();
}

function createReply(content) {
  let reply = new Object();
  reply.id = lastId();
  reply.content = content;
  reply.createdAt = "1 week ago";
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
  document.querySelector("#textboxReply").innerText = "";
  return reply;
}

function textboxCommentListener() {
  let textbox = document.querySelector("#sendComment");
  let btn = document.querySelector("#commentBtn");

  textbox.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      pushComment();
    }
  });
  btn.addEventListener("click", pushComment);
}

let indexOfCommentF;
let idOfCommentF;

function pushReply() {
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
  comments[indexOfCommentF].replies.push(
    createReply(document.querySelector("#textboxReply").innerText)
  );
  buildReply();
  buildDeleteBtn();
  document.querySelector(".input__section").remove();
}

function replyEnter(e) {
  if (e.key === "Enter") {
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
  <span class="textarea" role="textbox" id="textboxReply" contenteditable></span>
  <button class="primary-btn" id='textboxReplyBtn'>REPLY</button>
  </div>`;

  console.log(idElementSelected);
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
    .addEventListener("keypress", replyEnter);
  document
    .querySelector("#textboxReplyBtn")
    .addEventListener("click", pushReply);

  if (document.querySelector(".update")) {
    document.querySelector(".update").addEventListener("click", pushReply);
  }
}

function createCommentInput() {
  let html = `<div class="input__section">
  <img
    class="profile__img"
    src="${currentUser.image.png}"
    alt="Current User Image"
  />
  <span
    class="textarea"
    role="textbox"
    id="sendComment"
    placeholder="Add a comment..."
    contenteditable
  ></span>
  <button id="commentBtn" class="primary-btn">SEND</button>
</div>`;
  document.querySelector(".comments__input-container").innerHTML = html;
}

function addBtns() {
  buildDeleteBtn();

  let upvoteBtns = document.querySelectorAll(".upvote");
  upvoteBtns.forEach((icon) => {
    icon.addEventListener("click", upVote);
  });

  let downvoteBtns = document.querySelectorAll(".downvote");
  downvoteBtns.forEach((icon) => {
    icon.addEventListener("click", downVote);
  });

  let upvoteBtnsArr = Array.from(upvoteBtns);
  let downvoteBtnsArr = Array.from(downvoteBtns);
  let numberHTML = document.querySelectorAll(".comment__score-number");

  function upVote(e) {
    let index = upvoteBtnsArr.indexOf(this);
    let commentToLike = e.target.parentNode.parentNode.parentNode.dataset.id;

    for (comment of comments) {
      if (comment.id === parseInt(commentToLike)) {
        comment.score++;
        numberHTML[index].innerHTML = comment.score;
      }
      for (replies of comment.replies) {
        if (replies.id === parseInt(commentToLike)) {
          replies.score++;
          numberHTML[index].innerHTML = replies.score;
        }
      }
    }
  }

  function downVote(e) {
    let index = downvoteBtnsArr.indexOf(this);
    let commentToDislike = e.target.parentNode.parentNode.parentNode.dataset.id;

    for (comment of comments) {
      if (comment.id === parseInt(commentToDislike)) {
        comment.score--;
        document.querySelector(
          `[data-id='${commentToDislike}'] .comment__score-number`
        ).innerHTML = comment.score;
      }
      for (replies of comment.replies) {
        if (replies.id === parseInt(commentToDislike)) {
          replies.score--;
          numberHTML[index].innerHTML = replies.score;
        }
      }
    }
  }

  let getIdTest = document.querySelectorAll(".wrapper");
  getIdTest.forEach((item) => {
    item.addEventListener("click", function (e) {
      idElementSelected = parseInt(e.currentTarget.parentNode.dataset.id);
      console.log(idElementSelected);
    });
  });

  let replyBtns = document.querySelectorAll(".reply-btn");
  replyBtns.forEach((btn) => {
    btn.addEventListener("click", replyTo);
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

//Reply trigger
let idElementSelected; //Save id to comment to reply
function replyTo(e) {
  setTimeout(function () {
    addReplyInput();
    //document.querySelector("#textboxReply").innerText =  "@" + document.querySelector(`[data-id='${idElementSelected}'] .comment__profile-name`).innerText;
    document.querySelector("#textboxReply").focus();
  }, 1);
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
  <span class="textarea" role="textbox" id="textboxEditing" contenteditable>${content}</span>
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
  for (comment of comments) {
    if (comment.id === elementToEditId) {
      comment.content = document.querySelector("#textboxEditing").innerText;
      document.querySelector(
        `[data-id='${elementToEditId}'] .inner__comment .comment__text`
      ).innerText = comment.content;
    }
    for (reply of comment.replies) {
      if (reply.id === elementToEditId) {
        reply.content = document.querySelector("#textboxEditing").innerText;
        document.querySelector(
          `[data-id='${elementToEditId}'] .inner__comment .comment__text`
        ).innerText = reply.content;
      }
    }
  }

  buildDeleteBtn();
  commentText.classList.remove("isEditing");
  document.querySelector(".editionWrapper").remove();
}
function updateOnEnter(e) {
  if (e.key === "Enter") {
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
        deleteBtn();
      }, 1);
    });
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
}
//DELETE BTNS CREATION AND FUNCTION END
