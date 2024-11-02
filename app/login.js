
function gotoHompage(){
    const urlParams = new URLSearchParams(window.location.search);
    const machineId = urlParams.get('machineId');
    let NewUser = {
        Fname: document.getElementById('firstname').value,
        Lname: document.getElementById('lastname').value,
        password: document.getElementById('password').value,
        machineId: machineId,
    };
    let options = {
        method: 'Post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(NewUser),
    };
    fetch('/add', options);
    let fulname = NewUser.Fname + ' ' + NewUser.Lname;
    let url = `homepage.html?user=${fulname}`
    location.href = url;
}

function submit(){
    check();
    async function check(){
        let json = await fetch('/get');
        let response = await json.json();
        response.forEach(element => {
            if(document.getElementById('password').value == element.password){
                if(document.getElementById('firstname').value == element.Fname){
                    if(document.getElementById('lastname').value == element.Lname){
                        alert('This acount already exists');
                        document.getElementById('password').value = '';
                        document.getElementById('firstname').value = '';
                        document.getElementById('lastname').value = '';
                    }
                    else{
                        gotoHompage();
                    }
                }
                else{
                    gotoHompage();
                }
            }
            else{
                gotoHompage();
            }
        });
    }
};