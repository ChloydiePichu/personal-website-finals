const buttons = document.querySelectorAll('.button-container button');
const displayBox = document.getElementById('display-box');
const contentElements = {};

document.querySelectorAll('.hidden-content').forEach(element => {
    contentElements[element.id] = element.innerHTML;
    element.remove();
});

function initializeCarousel() {
    const images = document.querySelectorAll('.carousel-image');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((image, i) => {
            image.style.display = (i === index) ? 'block' : 'none';
        });
    }

    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    showImage(currentIndex);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target;
        displayBox.innerHTML = '';  

        if (targetId === 'survey') {
            displayBox.innerHTML = contentElements[targetId];
            const submitButton = displayBox.querySelector('.submit-button');

            submitButton.addEventListener('click', async () => {
                const suggestions = displayBox.querySelector('#suggestions').value;
                const likes = displayBox.querySelector('#likes').value;
                const rating = displayBox.querySelector('input[name="rating"]:checked')?.value;

                const feedbackData = {
                    suggestions: suggestions,
                    likes: likes,
                    rating: rating
                };

                try {
                    const response = await fetch('http://127.0.0.1:5000/submit-feedback', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(feedbackData)
                    });

                    if (response.ok) {
                        alert('Thank you for your feedback!');
                    } else {
                        alert('Failed to submit feedback. Please try again.');
                    }
                } catch (error) {
                    alert('Error submitting feedback. Check your internet connection.');
                    console.error('Error:', error);
                }
            });

        } else if (targetId === 'gallery') {
            const galleryContent = `
                <div class="carousel">
                    <button class="prev-button">❮</button>
                    <div class="carousel-images">
                        <img src="gala.jpg" alt="Gallery Image 1" class="carousel-image" />
                        <img src="pc pic.jpg" alt="Gallery Image 2" class="carousel-image" />
                    </div>
                    <button class="next-button">❯</button>
                </div>
            `;
            displayBox.innerHTML = galleryContent;
            initializeCarousel(); 
        } else {
            displayBox.innerHTML = contentElements[targetId];
        }
    });
});
