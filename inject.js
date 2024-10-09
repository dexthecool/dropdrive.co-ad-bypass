// Define the 'working' and 'unlocked' variables at the top
let working = false;
let unlocked = false;

// Bypass the ad and directly download the file using the provided UUID
function download() {
    console.log("Injecting custom download function to bypass ads...");

    if (working) return;
    working = true;

    if (unlocked) {
        (async () => {
            const r = await fetch('/get-download-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uuid: '4486397d-74f3-47e1-aa89-1309ecd9f6ec' // replace this with the real UUID extracted
                })
            });
            if (r.status == 200) {
                const data = await r.json();
                working = false;
                window.location.href = data.url; // Direct download
            } else {
                alert('Something went wrong');
                window.location.reload();
            }
        })();
    } else {
        document.getElementById('download-button').innerText = 'Download';
        unlocked = true;
        working = false;
    }
}

// Inject the new download function into the page
document.querySelector("#download-button").onclick = download;
