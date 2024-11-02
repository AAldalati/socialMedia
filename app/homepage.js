
const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');
console.log(user);

let likeCount = 0;

run();
async function run() {
    let json = await fetch('/getPost');
    let response = await json.json();
    let json1 = await fetch('/getPost1');
    let response1 = await json1.json();
    for (let i = 0; i < response1.length; i++) {
        let one = response[i]?.files[0];
        let two = response1[i]?.content;

        document.getElementById('body').innerHTML += `
                    <div class="post">
                        <div class="post-header">
                            <div class="user-info">
                                <h4 class="username">${response1[i].user}</h4>
                            </div>
                        </div>
                        <div class="post-content">
                            <h1>${two}</h1>
                            <img src="${one?.data}" alt="Post Image" class="post-image">
                        </div>
                        <div class="post-actions">
                            <button class="like-button" data-id="${response1[i]._id}">❤️ Like</button>
                            <button class="comment-button" data-id="${response1[i]._id}">💬 Comment</button>
                            <h6 class="linkcomments" data-id="${response1[i]._id}">See comments</h6>
                        </div>
                    </div>
                `;
    }

    // Add event listeners
    addEventListeners();
}

function addEventListeners() {
    const likeButtons = document.getElementsByClassName('like-button');
    Array.from(likeButtons).forEach(button => {
        button.addEventListener('click', () => {
            likeCount++;
            const postId = button.getAttribute('data-id');
            console.log(`Liked post ID: ${postId}`);

            let options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ data: 'clicked', type: 'like', _id: postId, user: user }),
            };
            fetch('/add4', options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(result => {
                    console.log(result); // Handle success
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was an error liking the post.');
                });
        });
    });

    const commentButtons = document.getElementsByClassName('comment-button');
    Array.from(commentButtons).forEach(button => {
        button.addEventListener('click', async () => {
            console.log(user);
            const comment = prompt('Enter your comment:');
            if (comment) {
                const postId = button.getAttribute('data-id');
                if (!user) {
                    console.error("User is not defined.");
                    alert("You must be logged in to comment.");
                    return;
                }

                let options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ data: comment, type: 'comment', _id: postId, user: user }),
                };

                try {
                    const response = await fetch('/add3', options);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    console.log(result); // Handle success
                } catch (error) {
                    console.error('Error:', error);
                    alert('There was an error submitting your comment. Please try again.');
                }
            }
        });
    });

    const commentLinks = document.getElementsByClassName('linkcomments');
    Array.from(commentLinks).forEach(link => {
        link.addEventListener('click', () => {
            let id = link.getAttribute('data-id');
            let url = `comments.html?id=${id}`;
            location.href = url;
        });
    });
}

function create(){
    let url = `post.html?user=${user}`;
    location.href = url;
}