const discussPosts = document.getElementById("discuss-posts");
const markedSection = document.getElementById("marked-section");
const loadingSpinner = document.getElementById("loading-spinner");
const readCount = document.getElementById("read-count");

const showDiscussPosts = async (postCategory) => {
  loadingSpinner.style.display = "block";
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${postCategory}`
  );
  const data = await res.json();
  const singlePosts = data.posts;
  displayPosts(singlePosts);
};

const displayPosts = (singlePosts) => {
  discussPosts.textContent = "";

  singlePosts.forEach((singlePost) => {
    setTimeout(() => {
      loadingSpinner.style.display = "none";
      const postCard = document.createElement("div");
      postCard.classList = `flex lg:p-10 p-6 bg-[#F3F3F5] cursor-pointer rounded-3xl border-[#797DFC] hover:bg-[#797DFC1A] hover:border-[1px]`;
      postCard.innerHTML = `
            
                <div class="pr-6 relative">
                    <div
                    class="absolute w-4 h-4 ${
                      singlePost.isActive ? "bg-green-500" : "bg-red-500"
                    } rounded-full right-5 -top-1"
                    ></div>
                    <img class="rounded-2xl w-[72px]" src="${
                      singlePost.image
                    }" alt="" />
                </div>
                <div class="space-y-3">
                    <div class="flex gap-5 text[#12132DCC] font-inter text-sm font-medium">
                        <p># ${singlePost.category}</p>
                        <p>Author : ${singlePost.author.name}</p>
                    </div>
                    <div class="pb-5 border-b-[2px] border-dashed border-[#12132D40] space-y-4">
                        <h3 class="text-xl font-bold text-[#12132D]">
                            ${singlePost.title}
                        </h3>
                        <p>
                           ${singlePost.description}
                        </p>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex pt-2 gap-6 *:flex *:gap-4 *:items-center">
                            <div>
                                <img src="images/message.png" alt="" />
                                <p>${singlePost.comment_count}</p>
                            </div>
                            <div>
                                <img src="images/eye.png" alt="" />
                                <p>${singlePost.view_count}</p>
                            </div>
                            <div>
                                <img src="images/message.png" alt="" />
                                <p><span>${
                                  singlePost.posted_time
                                }</span> min</p>
                            </div>
                        </div>
                        <button onclick="markRead('${singlePost.title}', ${
        singlePost.view_count
      })" class="p-2 rounded-full hover:bg-black"><img src="images/email-box.png" alt="" /></button>
                    </div>
                </div>
        `;
      discussPosts.appendChild(postCard);
    }, 2000);
  });
};

let readCountDefault = 0;

const markRead = (markedTitle, markedView) => {
  const markedCard = document.createElement("div");
  markedCard.classList = `flex justify-between bg-white rounded-3xl p-6`;
  markedCard.innerHTML = `
                 <h2 class="lg:text-lg font-bold text-mainColor">
                    ${markedTitle}
                </h2>
                <div class="flex justify-center items-center gap-2">
                    <img src="images/eye.png" alt="" />
                    <p>${markedView}</p>
                 </div>
    `;
  markedSection.appendChild(markedCard);

  readCountDefault += 1;
  readCount.innerText = readCountDefault;
};

const handelSearch = () => {
  const searchValue = document.getElementById("search-box").value;
  if (searchValue) {
    showDiscussPosts(searchValue);
  } else {
    alert("Please enter valid category name");
  }
};

showDiscussPosts("Comedy");

// latests Posts //

const showLatestPostSelect = document.getElementById("show-latest-post");

const showLatestPosts = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await res.json();
  const singleLatestPosts = data;
  displayLatestPosts(singleLatestPosts);
};

const displayLatestPosts = (singleLatestPosts) => {
  singleLatestPosts.forEach((singleLatestPost) => {
    const latestPostCard = document.createElement("div");
    latestPostCard.classList = `p-6 border-[1px] border-[#12132D26] rounded-3xl space-y-5`;
    latestPostCard.innerHTML = `
            <img class="w-full rounded-[20px]" src="${
              singleLatestPost.cover_image
            }" alt="" />
            <p class="flex gap-4 items-center">
                <img src="images/icons/celender.png" alt="" />
                <span class="text-[]">${
                  singleLatestPost?.author?.posted_date || "No publish date"
                }</span>
            </p>
            <h3 class="text-lg font-extrabold">
                ${singleLatestPost.title}
            </h3>
            <p class="text-[#12132D99]">
                ${singleLatestPost.description}
            </p>
            <div class="flex gap-4 items-center">
            <img class="rounded-full w-11" src="${
              singleLatestPost.profile_image
            }" alt="" />
                <div class="">
                    <h6 class="text-base font-bold">${
                      singleLatestPost.author.name
                    }</h6>
                    <p class="text-sm text-[#12132D99]">${
                      singleLatestPost?.author?.designation || "Unknown"
                    }</p>
                </div>
            </div>
          `;
    showLatestPostSelect.appendChild(latestPostCard);
  });
};

showLatestPosts();
