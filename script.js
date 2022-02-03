const portfolio = {};

portfolio.init = () => {
    portfolio.switchPortfolioFromFeatured();
}

const portfolioBars = document.querySelector(".pBarP");
const featured = document.querySelector(".featured");
const all = document.querySelector(".projectDisplay");

portfolio.switchPortfolioFromFeatured = () => {
    portfolioBars.addEventListener("click", () => {
        featured.style.display = "none";
        all.style.display = "block";
    })
}
portfolio.init();