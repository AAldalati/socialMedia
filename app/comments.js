const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

run();
async function run() {
    let json = await fetch('/getPost2');
    let response = await json.json();
    displayComments(response);
}

function displayComments(comments) {
    const commentsDiv = document.getElementById('comments');
    comments.forEach(comment => {
        console.log(comment._id);
        console.log(postId);
        if(postId == comment._id){
            console.log(comment);
            commentsDiv.innerHTML += `
                <div class="comment">
                <div class="comment-header">${comment.user}</div>
                <div class="comment-content">${comment.data}</div>
            </div>
            `;
        }
    });
}

document.getElementById('backButton').addEventListener('click', () => {
    window.history.back();
});
