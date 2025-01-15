const getUrl = "https://raw.githubusercontent.com/Frongus/000006/refs/heads/main/information.json";
var publicInfo;

var typeLatest;
var messageTypeLatest;
var textLatest;
var languageTypeLatest;

fetch(getUrl, {
    headers: {
        "Content-Type": "application/json",
    },
    method: "GET",
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && Array.isArray(data.general) && data.general.length > 0) {
            const info = data.general[0];
            publicInfo = info;
            localStorage.setItem('AI_URL', info.AI_ACCESS_POINT);
        } else {
            alert("The 'general' field is missing or does not contain data.");
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("Failed to fetch data. Please check the console for details.");
    });


async function loadLastSession() {
    typeLatest = localStorage.getItem('type');
    messageTypeLatest = localStorage.getItem('messageType');
    textLatest = localStorage.getItem('text');
    languageTypeLatest = localStorage.getItem('languageType');

    const typeSelection = document.getElementById('typeSelection');
    const textType = document.getElementById('textType');
    const languageInput = document.getElementById('inputTextValue');
    const language = document.getElementById('languageInput');

    typeSelection.value = typeLatest;
    textType.value = messageTypeLatest;
    languageInput.value = textLatest;
    language.value = languageTypeLatest;
}

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    loadLastSession();
  });