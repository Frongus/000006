const btn = document.getElementById('translateBtn');

var localGlobalAiUrl;
var loading = false;

console.log("Script")

function activateLoadingSpinner() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'flex';
}

function deactivateLoadingSpinner() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'none'; 
}


async function translateInput() {
    activateLoadingSpinner();
    const typeSelection = document.getElementById('typeSelection');
    const textType = document.getElementById('textType');
    const languageInput = document.getElementById('inputTextValue');
    const language = document.getElementById('languageInput');
    const languageOutput = document.getElementById('outTextValue');

    languageOutput.value = "Wird Übersetzt, bitte warten";

    const aiUrl = window.localStorage.getItem('AI_URL');

    var type = typeSelection.value;
    var messageType = textType.value;
    var text = languageInput.value;
    var languageType = language.value;

    console.log({
        type,
        messageType,
        text,
        languageType
    });
    
    try{    
        await savePreviousContent(type, messageType, text, languageType);
    } catch (e) {
        const notTitle = e;
        const notBody = "Client error";

        new window.Notification(notTitle, {notBody})
        location.reload();
    }

    if (type === "" | messageType === "" | text === "") {

        const notBody = "User error";
        const notTitle = "Bitte Alle Felder ausfüllen";

        new window.Notification(notTitle, {notBody})
        location.reload();
    }

    localGlobalAiUrl = aiUrl;
    fetch(aiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            typeSelection: type,
            textType: messageType,
            languageInput: text,
            language: languageType
        })
    }).then(response => response.json()).then((data) => {
        console.log(data);
        deactivateLoadingSpinner();
        if(data.message) {
            const notBody = data.message;
            const notTitle = "Es ist etwas schiefgelaufen, bitte erneut versuchen";

            new window.Notification(notTitle, {notBody})
            location.reload();
        } else {
            loading = false;
            languageOutput.value = data.translation
        }
    })
}

btn.addEventListener('click', () => {
    translateInput();
});

async function savePreviousContent(type, messageType, text, languageType) {
    const promise = new Promise((resolve, reject) => {
        try {
            localStorage.setItem('type', type);
            localStorage.setItem('messageType', messageType);
            localStorage.setItem('text', text);
            localStorage.setItem('languageType', languageType);
            resolve('ok')
        } catch(e) {
            reject(e);
        }
    });

    return promise
}
