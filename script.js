const portfolio = {};

portfolio.init = () => {
    portfolio.switchPortfolioToFeatured();
    portfolio.switchPortfolioToAll();
    portfolio.submitComment();
    portfolio.changeMenuOnScroll();
    portfolio.closeMenuOnClick();
}
const navLinks = document.querySelector(".linkFlex");
const hamburger = document.querySelector(".hamburgerDiv");
// window.getComputedStyle(hamburger).opacity;
// we want to create a tracker for user scroll
// once user scrolls past an amount of pixels, the nav will disappear and the hamburger will appear 
portfolio.changeMenuOnScroll = () => {
    document.addEventListener('scroll', ()=>{
        scrollPosition = window.pageYOffset;
        if (scrollPosition >= 10){
            navLinks.style.visibility = "hidden";
            hamburger.style.opacity = "0.85";
            hamburger.style.visibility = "visible"
            } else {
            navLinks.style.visibility = "visible";
            hamburger.style.opacity = "0";
            hamburger.style.visibility = "hidden";
            document.getElementById("toggler").checked = false;
            }
    })
}

const overlayLinkArray = document.getElementsByClassName("overlayLink");
const menuToggler = document.querySelector(".toggler");


portfolio.closeMenuOnClick = () => {
    for (let i = 0; i < overlayLinkArray.length; i++) {
        overlayLinkArray[i].addEventListener('click', () => {
            document.getElementById("toggler").checked = false;
        })
    } 
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
        all.style.display = "flex";
        allP.style.color = "white";
        portfolioBarAll.style.borderBottom = "2px solid white";
        portfolio.projectCarousel();
    })
}

const formButton = document.querySelector(".contactButton");
const form = document.querySelector(".contactForm");

portfolio.safeInput = (input) => {
        return String(input)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

portfolio.submitComment = () => {
    formButton.addEventListener("click", () => {
        const subject = document.querySelector(".contactSubject").value;
        const email = document.querySelector(".contactEmail").value;
        const message = document.querySelector(".contactMessage").value; 
        const link = "mailto:antoniibrahimdeveloper@gmail.com"
            + `?cc=${portfolio.safeInput(email)}`
            + "&subject=" + encodeURIComponent(portfolio.safeInput(subject))
            + "&body=" + encodeURIComponent(portfolio.safeInput(message))
            ;

        window.location.href = link;

        const formChange = `
        <p class="submittedContact"> Thank you for contacting me! I'll be in touch shortly, be well!</p>
        `
        form.innerHTML = formChange;

    })
}

const track = document.querySelector(".slides");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".rightDiv");
const prevButton = document.querySelector(".leftDiv");
const carouselNav = document.querySelector(".carouselNav");
const dots = Array.from(carouselNav.children);



portfolio.projectCarousel = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * (index * 50) + "px";
    })
    
    
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = `translateX(-` + targetSlide.style.left + `)`;
        currentSlide.classList.remove("currentSlide");
        targetSlide.classList.add("currentSlide");
    }
    //moving slides on the right button
    nextButton.addEventListener('click', e => {
        //grab current slide
        const currentSlide = track.querySelector(".currentSlide");
        const nextSlide = currentSlide.nextElementSibling;
        
        moveToSlide(track, currentSlide, nextSlide);
        
        // change dot on arrow next click
        const currentDot = carouselNav.querySelector(".currentSlide");
        const nextDot = currentDot.nextElementSibling;
        updateDots(currentDot, nextDot);

        const nextIndex = slides.findIndex(
            slide => slide === nextSlide
        )

        hideArrows(slides, prevButton, nextButton, nextIndex);

    })
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector(".currentSlide");
        const prevSlide = currentSlide.previousElementSibling;
       
        moveToSlide(track, currentSlide, prevSlide);
        
        const currentDot = carouselNav.querySelector(".currentSlide");
        const prevDot = currentDot.previousElementSibling;

        updateDots(currentDot, prevDot);

        const prevIndex = slides.findIndex(
            slide => slide === prevSlide
        )

        hideArrows(slides, prevButton, nextButton, prevIndex);
    })
    carouselNav.addEventListener('click', e => {
        // find which indicator was clicked on 
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.currentSlide');
        const currentDot = carouselNav.querySelector(".currentSlide");
        const targetIndex = dots.findIndex( dot => 
            dot === targetDot
        );
        const targetSlide = slides[targetIndex];
        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideArrows(slides, prevButton, nextButton, targetIndex);
    })
    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove("currentSlide");
        targetDot.classList.add("currentSlide");

    }
    const hideArrows = (slides, prevButton,nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.classList.add('isHidden');
            nextButton.classList.remove('isHidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('isHidden');
            nextButton.classList.add('isHidden');
        } else {
            prevButton.classList.remove('isHidden');
            nextButton.classList.remove('isHidden');
        }
    }
   
}


portfolio.init();