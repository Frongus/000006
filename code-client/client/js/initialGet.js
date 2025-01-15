const getUrl = "https://raw.githubusercontent.com/Frongus/000006/refs/heads/main/information.json";
var publicInfo;

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
            alert(`AI Access Point: ${info.AI_ACCESS_POINT}\nOwner: ${info.OWNER}\nPowered By: ${info.POWERD_BY}`);
            publicInfo = info;
        } else {
            alert("The 'general' field is missing or does not contain data.");
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("Failed to fetch data. Please check the console for details.");
    });
