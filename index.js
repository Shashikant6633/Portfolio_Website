

$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});



// Carousel of image

const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper1 i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft;

// Get the number of cards that can fit in the carousel at once...
let cardPreview = Math.round(carousel.offsetWidth / firstCardWidth);

// insert copies of the last few cards to the beginning of the carousel for infinite scrolling..
carouselChildrens.slice(-cardPreview).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin",card.outerHTML);
});

// insert copies of the first few cards to the end of the carousel for infinite scrolling..
carouselChildrens.slice(0, cardPreview).forEach(card => {
    carousel.insertAdjacentHTML("beforeend",card.outerHTML);
});

// Added event listner for the arrow btn to scroll the carousel left and right...
arrowBtns.forEach(btn => {
    btn.addEventListener("click", ()=> {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the intial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {

    if(!isDragging) return;  // if isDragging is false return from here
    // Updates the scroll position of the carousel basednon the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () =>{
    isDragging = false;
    carousel.classList.remove("dragging");
}


const infiniteScroll = () => {
    // if the carousel is at the beginning, scroll to the end...
    if(carousel.scrollLeft === 0)
    {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // if the carousel is at the end scroll, to the beginning...
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}

carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("mousemove",dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll",infiniteScroll);

// Js For Counter....

// select the element
const counters = document.querySelectorAll('.counter');

// iterate through all the counter elements
counters.forEach(counter => {
  // function to increment the counter
  function updateCount() {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerHTML;

    const inc = Math.floor((target - count) / 100);

    if (count < target && inc > 0) {
      counter.innerHTML = (count + inc);
      // repeat the function
      setTimeout(updateCount, 1);
    }
    // if the count not equal to target, then add remaining count
    else {
      counter.innerHTML = target;
    }
  }
  updateCount();
});

// Table JS

$(document).ready(function() {
    $('#myTable').DataTable({
    	pageLength : 10

    });
});


// Form Bulk Validation....


