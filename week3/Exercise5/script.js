const images = [
    "NET.jpg",
    "ocean.jpg",
    "sea.jpg",
    "Tulipa.jpg",
    "sunflowers.jpg",
    "flowers"
];

let currentIndex = 0;

const galleryImg = document.getElementById("galleryImg");
const imageCounter = document.getElementById("imageCounter");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateGallery() {
    galleryImg.src = images[currentIndex];
    imageCounter.textContent = `${currentIndex + 1} of ${images.length}`;
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
});

// Initialize
updateGallery();