fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    datos = data;
    buildComments();
  });

function buildComments() {
  let n = 0;
  datos.comments.forEach((item) => {
    html = `<div class="comment">
    <div class="like__section">
      <span class="icon">+</span> <span class='number'>${item.score}</span> <span class="icon">-</span>
    </div>
    <div class="content__section">
      <div class="top__section">
        <div class="profile">
          <img src="${item.user.image.png}" alt="" />
          <span class="profile__name"> ${item.user.username}</span>
          <span class="createdAt">${item.createdAt}</span>
        </div>
        <div class="share">
          <span><img src="./images/icon-reply.svg" alt="">Reply</span>
        </div>
      </div>
      <div class="comment-text">
        ${item.content}
      </div>
    </div>
  </div>`;

    document.querySelector(".comments__section").innerHTML += html;

    if (item.replies != 0) {
      n++;
      item.replies.forEach((reply) => {
        replies = `<div class="replies">
      <div class="like__section">
        <span class="icon">+</span> <span class='number'>${reply.score}</span> <span class="icon">-</span>
      </div>
      <div class="content__section">
        <div class="top__section">
          <div class="profile">
            <img src="${reply.user.image.png}" alt="" />
            <span class="profile__name"> ${reply.user.username}</span>
            <span class="createdAt">${reply.createdAt}</span>
          </div>
          <div class="share">
            <span><img src="./images/icon-reply.svg" alt="">Reply</span>
          </div>
        </div>
        <div class="comment-text">
          ${reply.content}
        </div>
      </div>
    </div>`;
        console.log(replies);
        document.querySelectorAll(".comment")[n].innerHTML += replies;
      });
    }
  });
}

function comments() {
  let n = 0;
  datos.comments.forEach((item) => {
    if (item.replies != 0) {
      n++;
      item.replies.forEach((reply) => {
        replies = `<div class="replies">
      <div class="like__section">
        <span class="icon">+</span> <span class='number'>${reply.score}</span> <span class="icon">-</span>
      </div>
      <div class="content__section">
        <div class="top__section">
          <div class="profile">
            <img src="${reply.user.image.png}" alt="" />
            <span class="profile__name"> ${reply.user.username}</span>
            <span class="createdAt">${reply.createdAt}</span>
          </div>
          <div class="share">
            <span><img src="./images/icon-reply.svg" alt="">Reply</span>
          </div>
        </div>
        <div class="comment-text">
          ${reply.content}
        </div>
      </div>
    </div>`;
        console.log(replies);
        document.querySelectorAll(".comment")[n].innerHTML += replies;
      });
    }
  });
}
