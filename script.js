const images = document.querySelectorAll(".image");
const filterButtons = document.querySelectorAll(".filter-buttons button");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;
let visibleImages = [];

function updateVisibleImages() {
    visibleImages = [...document.querySelectorAll(".image:not(.hidden)")];
}

updateVisibleImages();

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        images.forEach(image => {

            if (filter === "all") {

                image.classList.remove("hidden");

            } else {

                if (image.classList.contains(filter)) {

                    image.classList.remove("hidden");

                } else {

                    image.classList.add("hidden");

                }

            }

        });

        updateVisibleImages();

    });

});


visibleImages.forEach((img, index) => {

    img.addEventListener("click", () => {

        currentIndex = index;

        showImage();

    });

});

function attachClickEvents(){

    updateVisibleImages();

    visibleImages.forEach((img,index)=>{

        img.onclick=()=>{

            currentIndex=index;

            showImage();

        }

    });

}

attachClickEvents();
function showImage(){

    lightbox.classList.add("active");

    lightboxImg.src =
    visibleImages[currentIndex].querySelector("img").src;

}


closeBtn.onclick=()=>{

lightbox.classList.remove("active");

}


nextBtn.onclick=()=>{

currentIndex++;

if(currentIndex>=visibleImages.length){

currentIndex=0;

}

showImage();

}

prevBtn.onclick=()=>{

currentIndex--;

if(currentIndex<0){

currentIndex=visibleImages.length-1;

}

showImage();

}


lightbox.addEventListener("click",(e)=>{

if(e.target===lightbox){

lightbox.classList.remove("active");

}

});



document.addEventListener("keydown",(e)=>{

if(!lightbox.classList.contains("active")) return;

if(e.key==="Escape"){

lightbox.classList.remove("active");

}

if(e.key==="ArrowRight"){

nextBtn.click();

}

if(e.key==="ArrowLeft"){

prevBtn.click();

}

});