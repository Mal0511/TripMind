

let getHomePage = (req, res) => {
    return res.render("main_screen");
}

module.exports = {
    getHomePage : getHomePage,
}