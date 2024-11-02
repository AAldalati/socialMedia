
const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');
/*
function getData() {
    const content = document.getElementById('postContent').value;
    let fileInput = document.getElementById('postImage');
    let image = fileInput.files[0];
    let NewPost = new FormData();
    NewPost.append('text', content);
    NewPost.append('file', image);
    console.log(NewPost);
    return NewPost;
}

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let NewPost = getData();
    let options = {
        method: 'Post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(NewPost),
    };
    fetch('/add1', options);
    document.getElementById('postContent').value = '';
    document.getElementById('postImage').value = '';
});
*/

document.getElementById('postForm').addEventListener('submit', async () => {
    const input = document.getElementById('postImage');
    const files = input.files;

    if (files.length === 0) {
        alert('Please select a file to upload.');
        return;
    }

    const fileData = [];

    // Convert each file to a Base64 string
    for (const file of files) {
        const base64 = await toBase64(file);
        fileData.push({ name: file.name, type: file.type, data: base64 });
    }

    const jsonData = {
        files: fileData,
    };

    try {
        const response = await fetch('add1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const result = await response.json();
        console.log('Upload successful:', result);
    } catch (error) {
        console.error('Error:', error);
    }
    const content = document.getElementById('postContent').value;
    const response = await fetch('add2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({content, user}),
    });
    console.log(response);
});

// Helper function to convert file to Base64
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}