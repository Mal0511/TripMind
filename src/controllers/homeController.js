

let getHomePage = (req, res) => {
    return res.render("http://localhost:3000/home");
}

module.exports = {
    getHomePage : getHomePage,
}