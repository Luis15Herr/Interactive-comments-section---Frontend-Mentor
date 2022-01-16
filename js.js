fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    datos = data;
    currentUser = datos.currentUser;
    comments = datos.comments;
    buildComments();
    addBtn();
    lastId();
  });

function buildComments() {
  let n = 0;
  comments.forEach((item) => {
    html = `<div class="comment">
    <div class="comment__wrapper" data-id="${item.id}">

    <div class="like__section">
    <img class='icon plus' src="./images/icon-plus.svg" alt="PLUS BTN"> <span class='number'>${item.score}</span> <img class='icon minus' src="./images/icon-minus.svg" alt="MINUS BTN">
    </div>
    <div class="content__section">
      <div class="top__section">
        <div class="profile">
          <img src="${item.user.image.png}" alt="" />
          <span class="profile__name"> ${item.user.username}</span>
          <span class="createdAt">${item.createdAt}</span>
        </div>
          <span class="share"><img src="./images/icon-reply.svg" alt="Reply btn">Reply</span>
      </div>
      <div class="comment-text">
        ${item.content}
      </div>
    </div>
    </div>
  </div>`;

    document.querySelector(".comments__section").innerHTML += html;

    if (item.replies != 0) {
      n++;
      item.replies.forEach((reply) => {
        replies = `<div class="replies" data-id="${reply.id}">
      <div class="like__section">
      <img class='icon plus' src="./images/icon-plus.svg" alt="PLUS BTN"> <span class='number'>${reply.score}</span> <img class='icon minus' src="./images/icon-minus.svg" alt="MINUS BTN">
      </div>
      <div class="content__section">
        <div class="top__section">
          <div class="profile">
            <img src="${reply.user.image.png}" alt="" />
            <span class="profile__name"> ${reply.user.username}</span>
            <span class="createdAt">${reply.createdAt}</span>
          </div>
            <span class="share"><img src="./images/icon-reply.svg" alt="Reply btn">Reply</span>
        </div>
        <div class="comment-text">
          ${reply.content}
        </div>
      </div>
    </div>`;
        document.querySelectorAll(".comment")[n].innerHTML += replies;
      });
    }
  });
}

function buildReply() {
  let reply = comments[whoPush].replies.at(-1);
  replies = `<div class="replies" data-id="${reply.id}">
      <div class="like__section">
      <img class='icon plus' src="./images/icon-plus.svg" alt="PLUS BTN"> <span class='number'>${reply.score}</span> <img class='icon minus' src="./images/icon-minus.svg" alt="MINUS BTN">
      </div>
      <div class="content__section">
        <div class="top__section">
          <div class="profile">
            <img src="${reply.user.image.png}" alt="" />
            <span class="profile__name"> ${reply.user.username}</span>
            <span class="createdAt">${reply.createdAt}</span>
          </div>
            <span class="share"><img src="./images/icon-reply.svg" alt="Reply btn">Reply</span>
        </div>
        <div class="comment-text">
          ${reply.content}
        </div>
      </div>
    </div>`;
  document.querySelectorAll(".comment")[whoPush].innerHTML += replies;
  addBtn();
}

let lastesId;
function lastId() {
  let bigId = 0;
  let bigRId = 0;
  let i = 0;
  for (let coment of comments) {
    if (coment.id > bigId) {
      bigId = coment.id;
    }
    for (let comente of comments[i].replies) {
      if (comente.id > bigRId) {
        bigRId = comente.id;
      }
    }
    i++;
  }

  if (bigRId > bigId) {
    latestId = bigRId;
  } else {
    lastesId = bigId;
  }
  return latestId + 1;
}

function creatorObj(content) {
  let reply = new Object();
  reply.id = lastId();
  reply.content = content;
  reply.createdAt = "1 week ago";
  reply.score = 0;
  reply.user = {
    image: {
      png: currentUser.image.png,
    },
  };
  reply.replyingTo =
    document.querySelectorAll(".profile__name")[whoPush].innerText;
  reply.username = currentUser.username;
  document.querySelector("#test").innerText = "";
  return reply;
}

let whoPush;

function push(e) {
  if (e.key === "Enter") {
    comments[whoPush].replies.push(
      creatorObj(document.querySelector("#test").innerText)
    );
    buildReply();
  }
}

function addInput() {
  if (document.querySelector(".input__section")) {
    document.querySelector(".input__section").remove();
  }

  let comments = document.querySelectorAll(".comment");
  let test = `
  <div class="input__section">
    <img class='profile__img' src="${currentUser.image.png}" alt="Current User Image" />
    <span class="textarea" role="textbox" id="test" contenteditable></span>
    <button>REPLY</button>
  </div>`;
  comments[whoPush].insertAdjacentHTML("afterend", test);
  //document.querySelector("#test").innerHTML = `<span class="replyTo">@${
  //document.querySelectorAll(".profile__name")[whoPush].innerText
  //}<span>`;

  document.querySelector("#test").addEventListener("keypress", push);
}

function addBtn() {
  let plus = document.querySelectorAll(".plus");
  plus.forEach((icon) => {
    icon.addEventListener("click", rateGood);
  });

  let minus = document.querySelectorAll(".minus");
  minus.forEach((icon) => {
    icon.addEventListener("click", rateBad);
  });

  let arrP = Array.from(plus);
  let arrM = Array.from(minus);
  let numberHTML = document.querySelectorAll(".number");

  function rateGood(e) {
    let index = arrP.indexOf(this);
    let elementToLike = e.target.parentNode.parentNode.dataset.id;

    for (coment of comments) {
      if (coment.id === parseInt(elementToLike)) {
        coment.score++;
        numberHTML[index].innerHTML = coment.score;
      }
      for (replies of coment.replies) {
        if (replies.id === parseInt(elementToLike)) {
          replies.score++;
          numberHTML[index].innerHTML = replies.score;
        }
      }
    }
  }

  function rateBad(e) {
    let index = arrM.indexOf(this);
    let elementToLike = e.target.parentNode.parentNode.dataset.id;

    for (coment of comments) {
      if (coment.id === parseInt(elementToLike)) {
        coment.score--;
        numberHTML[index].innerHTML = coment.score;
      }
      for (replies of coment.replies) {
        if (replies.id === parseInt(elementToLike)) {
          replies.score--;
          numberHTML[index].innerHTML = replies.score;
        }
      }
    }
  }

  let share = document.querySelectorAll(".share");
  share.forEach((btn) => {
    btn.addEventListener("click", replyTo);
  });
  let btn = Array.from(share);
  function replyTo() {
    whoPush = btn.indexOf(this);
    addInput();

    document.querySelector("#test").innerText =
      "@" + document.querySelectorAll(".profile__name")[whoPush].innerText;

    document.querySelector("#test").click();
  }
}
