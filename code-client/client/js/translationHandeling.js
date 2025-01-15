const btn = document.getElementById('translateBtn');

var localGlobalAiUrl;

console.log("Script")

async function translateInput() {
    const typeSelection = document.getElementById('typeSelection');
    const textType = document.getElementById('textType');
    const languageInput = document.getElementById('inputTextValue');
    const language = document.getElementById('languageInput');

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