// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Profile
const userName = document.getElementById('userName');
const userBio = document.getElementById('userBio');
const editProfile = document.getElementById('editProfile');

editProfile.addEventListener('click', () => {
    const name = prompt("Enter your name:", userName.textContent);
    const bio = prompt("Enter your bio:", userBio.textContent);
    if (name) userName.textContent = name;
    if (bio) userBio.textContent = bio;
    localStorage.setItem('profile', JSON.stringify({ name, userBio: bio }));
});

// Load profile
const savedProfile = JSON.parse(localStorage.getItem('profile'));
if (savedProfile) {
    userName.textContent = savedProfile.name;
    userBio.textContent = savedProfile.userBio;
}

// Stories
const storiesContainer = document.getElementById('storiesContainer');
const storyNames = ["Alice", "Bob", "Charlie", "David", "Eve"];
storyNames.forEach(name => {
    const div = document.createElement('div');
    div.classList.add('story');
    div.textContent = name;
    storiesContainer.appendChild(div);
});

// Notifications
const notifications = document.getElementById('notificationList');
function addNotification(message) {
    const li = document.createElement('li');
    li.textContent = message;
    notifications.appendChild(li);
}

// Posts
const feed = document.getElementById('feed');
const postInput = document.getElementById('postInput');
const addPost = document.getElementById('addPost');

let posts = JSON.parse(localStorage.getItem('posts')) || [];

function renderPosts() {
    feed.innerHTML = '';
    posts.slice().reverse().forEach((post, index) => {
        const div = document.createElement('div');
        div.classList.add('post');
        div.innerHTML = `
      <h3>${userName.textContent}</h3>
      <p>${post.content}</p>
      <button onclick="likePost(${index})">❤️ ${post.likes}</button>
      <button onclick="deletePost(${index})">🗑️</button>
    `;
        feed.appendChild(div);
    });
}

addPost.addEventListener('click', () => {
    const content = postInput.value.trim();
    if (content === '') { alert("Write something!"); return; }
    posts.push({ content, likes: 0 });
    localStorage.setItem('posts', JSON.stringify(posts));
    postInput.value = '';
    renderPosts();
    addNotification(`${userName.textContent} added a new post!`);
});

window.likePost = function (index) {
    posts[index].likes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
    addNotification(`${userName.textContent} liked a post!`);
}

window.deletePost = function (index) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
    addNotification(`${userName.textContent} deleted a post.`);
}

renderPosts();
