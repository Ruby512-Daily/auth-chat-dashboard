module.exports = async ({ app }) => {
    await require("./database")();
}