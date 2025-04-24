function search() {
    const query = document.querySelector('.search-bar input').value;
    alert("You searched for: " + query);
}

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;

    const offset = -currentSlide * 100;
    document.querySelector('.slider-container').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Initialize on load
window.onload = () => showSlide(currentSlide);

// Parallax Scroll Effect
document.addEventListener('DOMContentLoaded', () => {
    const heroBanner = document.querySelector('.hero-banner');
    const imageBanner = document.querySelector('.image-banner');

    // Enhanced parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        imageBanner.style.transform = `translateZ(-1px) scale(2) translateY(${rate}px)`;
    });

    // Intersection Observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe product cards
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });

    // Mouse move effect for product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

    // List of products - replace with your actual product names and URLs
    const products = [
        { name: "Crochet Flowers", url: "product1.html" },
        { name: "Crochet Clutchers", url: "product4.html" },
        { name: "Crochet Charms", url: "product3.html" },
        { name: "Crochet Octopus", url: "product2.html" },
        { name: "Crochet Bookmark", url: "product5.html" },
        { name: "Crochet Bouquet", url: "product6.html" }
    ];

    // Function to handle search
    function searchProducts(event) {
        event.preventDefault();  // Prevent the form from submitting normally

        const query = document.getElementById('searchInput').value.toLowerCase();
        const result = products.filter(product => product.name.toLowerCase().includes(query));

        if (result.length > 0) {
            // Redirect to the first product that matches the query
            window.location.href = result[0].url;
        } else {
            alert('No products found!');
        }
    }

