const portfolio = {};

portfolio.init = () => {
    portfolio.switchPortfolioToFeatured();
    portfolio.switchPortfolioToAll();
    portfolio.submitComment();
}

const portfolioBarFeatured = document.querySelector(".pBarB");
const portfolioBarAll = document.querySelector(".pBarA");
const allP = document.querySelector(".pBarPA");
const featuredP = document.querySelector(".pBarPB");
const featured = document.querySelector(".featured");
const all = document.querySelector(".projectDisplay");

portfolio.switchPortfolioToFeatured = () => {
    portfolioBarFeatured.addEventListener("click", () => {
        featured.style.display = "block";
        featuredP.style.color = "white";
        portfolioBarFeatured.style.borderBottom = "2px solid white";
        all.style.display = "none";
        allP.style.color = "grey";
        portfolioBarAll.style.borderBottom = "2px solid grey";

    })
}
portfolio.switchPortfolioToAll = () => {
    portfolioBarAll.addEventListener("click", () => {
        featured.style.display = "none";
        featuredP.style.color = "grey";
        portfolioBarFeatured.style.borderBottom = "2px solid grey";
        all.style.display = "block";
        allP.style.color = "white";
        portfolioBarAll.style.borderBottom = "2px solid white";
    })
}

const formButton = document.querySelector(".contactButton");
const form = document.querySelector(".contactForm");

portfolio.submitComment = () => {
    formButton.addEventListener("click", () => {
        const formChange = `
        <p class="submittedContact"> Thank you for contacting me! I'll be in touch shortly, be well!</p>
        `
        form.innerHTML = formChange;

    })
}
portfolio.init();