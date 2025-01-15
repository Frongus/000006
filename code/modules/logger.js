module.exports = {
    log: async function (req, important) {
        if(process.env.DEBUG === "true" | important) {
            console.log(req);
        }
    }
}