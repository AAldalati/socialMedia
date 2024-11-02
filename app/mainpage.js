
main();
function getIpAdress(){
    const peerConnection = new RTCPeerConnection({ iceServers: [] });
    peerConnection.createDataChannel('');

    peerConnection.createOffer()
    .then((offer) => peerConnection.setLocalDescription(offer))
    .catch((error) => console.log(error));

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            const IpAdress =  event.candidate.address;
            return IpAdress;
        }
    };
}

function getMachineId() {
    
    let machineId = localStorage.getItem('MachineId');
    
    if (!machineId) {
        machineId = crypto.randomUUID();
        localStorage.setItem('MachineId', machineId);
    }

    return machineId;
}

function main(){
    const IpAdress = getIpAdress();
    const machineId = getMachineId();
    check();
    async function check(){
        console.log(machineId);
        let json = await fetch('/get');
        let response = await json.json();
        var notFound = 0;
        response.forEach(element => {
            if(element.machineId == machineId+'?'){
                let fulname = element.Fname + element.Lname;
                let url = `homepage.html?user=${fulname}`;
                location.href = url;
            }
            else{
                notFound++;
            }
        });
        if(notFound == response.length){
            alert("you should sign in");
            let data = {
                machineId: machineId,
                IpAdress: IpAdress,
            };
            let url = `login.html?machineId=${machineId}?`;
            location.href = url;
        }
    }
}