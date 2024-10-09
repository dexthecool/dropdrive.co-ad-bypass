// When the button is clicked, send a message to the content script to trigger the download
document.getElementById('download-button').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: startDownload
      });
    });
  });
  
  // The function to be injected and executed in the page
  function startDownload() {
    const uuidRegex = /https:\/\/dropdrive\.co\/file\/([a-zA-Z0-9-]+)/;
    const match = window.location.href.match(uuidRegex);
  
    if (match && match[1]) {
      const uuid = match[1];
      console.log("Detected UUID:", uuid);
  
      let working = false;
      let unlocked = true; // Manually unlock the download
  
      async function download() {
        console.log("Running download function...");
  
        if (working) return;
        working = true;
  
        if (unlocked) {
          const r = await fetch('/get-download-link', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              uuid: uuid // Use the extracted UUID
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
        }
      }
  
      // Call the download function after unlocking the button
      download(); 
    } else {
      alert("UUID not found on this page!");
    }
  }
  