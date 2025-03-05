<template>
  <div>
    <div id="container">
      <img id="profile-image" src="../components/images/Lechico HDD.jpg" />
      <div id="about-me">
        <h2>About Me</h2>
        <p>Hello, my name is Chloyd! I am 20 years old and I am currently a 2nd year college student at APC.</p>
        <div class="button-container">
          <button data-target="education" @click="showContent('education')">Education</button>
          <button data-target="course" @click="showContent('course')">Course</button>
          <button data-target="it-experience" @click="showContent('it-experience')">IT Experience</button>
          <button data-target="hobbies" @click="showContent('hobbies')">Hobbies</button>
          <button data-target="goals" @click="showContent('goals')">Goals</button>
          <button data-target="gallery" @click="showContent('gallery')">Gallery</button>
          <button data-target="survey" @click="showContent('survey')">Survey</button>
        </div>
      </div>
      <div id="display-box"></div>

      <div id="education" class="hidden-content" :style="{ display: visibleContent === 'education' ? 'block' : 'none' }">
        <h2>Education & Achievements</h2>
        <ul>
          <li>Dean's Lister in Asia Pacific College for A.Y. 2023-2024</li>
          <li>Consistent top notcher from elementary to JHS</li>
          <li>Kinder - Grade 10 - Domini Angelicus Integrated School</li>
          <li>Grade 11 - Current - Asia Pacific College</li>
        </ul>
      </div>

      <div id="course" class="hidden-content" :style="{ display: visibleContent === 'course' ? 'block' : 'none' }">
        <h2>Course</h2>
        <p>WEBPROG for 2nd term A.Y. 2024-2025</p>
      </div>

      <div id="it-experience" class="hidden-content" :style="{ display: visibleContent === 'it-experience' ? 'block' : 'none' }">
        <h2>IT Experience</h2>
        <table>
          <tr>
            <th>Experience</th>
            <th>Date</th>
          </tr>
          <tr>
            <td>Developer of iTeach</td>
            <td>2021</td>
          </tr>
          <tr>
            <td>Developed a grade calculator web app</td>
            <td>2022</td>
          </tr>
          <tr>
            <td>Developed a facility-booking mobile app</td>
            <td>2024</td>
          </tr>
          <tr>
            <td>Student specializing in I.T.</td>
            <td>2021 - Current</td>
          </tr>
        </table>
      </div>

      <div id="hobbies" class="hidden-content" :style="{ display: visibleContent === 'hobbies' ? 'block' : 'none' }">
        <h2>Hobbies & Interests</h2>
        <ul>
          <li>Dancing</li>
          <li>Cooking</li>
          <li>Playing video games</li>
          <li>Taking naps</li>
        </ul>
      </div>

      <div id="survey" class="hidden-content" :style="{ display: visibleContent === 'survey' ? 'block' : 'none' }">
        <div class="survey-form" v-cloak>
          <h3>Website Feedback Survey</h3>

          <label for="suggestions">What changes would you suggest?</label>
          <textarea v-model="suggestions" placeholder="Share your suggestions..."></textarea>

          <label for="likes">What do you like about this website?</label>
          <textarea v-model="thoughts" placeholder="Share your thoughts..."></textarea>

          <label>Rate the design, colors, and ease of use:</label>
          <div class="rating">
            <input type="radio" id="star5" name="rating" value="5" v-model="rating" />
            <label for="star5">&#9733;</label>
            <input type="radio" id="star4" name="rating" value="4" v-model="rating" />
            <label for="star4">&#9733;</label>
            <input type="radio" id="star3" name="rating" value="3" v-model="rating" />
            <label for="star3">&#9733;</label>
            <input type="radio" id="star2" name="rating" value="2" v-model="rating" />
            <label for="star2">&#9733;</label>
            <input type="radio" id="star1" name="rating" value="1" v-model="rating" />
            <label for="star1">&#9733;</label>
          </div>

          <button class="submit-button" @click="submitSurvey">Submit Feedback</button>

          <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>
        </div>
      </div>

      <div id="goals" class="hidden-content" :style="{ display: visibleContent === 'goals' ? 'block' : 'none' }">
        <h2>Goals & Dreams</h2>
        <p>
          I want to become a consistent person. Consistent in keeping myself in shape and healthy, consistent in maintaining relationships, consistent in keeping myself motivated, etc. I also aim to create a video game that I always wanted as a kid. That is the reason for my enrolment in APC.
        </p>
      </div>
      <div id="gallery" class="hidden-content" :style="{ display: visibleContent === 'gallery' ? 'block' : 'none' }">
        <h2>Picture Gallery</h2>
        <div id="carousel" class="carousel">
          <button @click="prevImage" class="carousel-button prev-button">&#8592;</button>
          <div class="image-gallery">
            <img :src="images[currentImage]" :alt="'Image ' + (currentImage + 1)" class="carousel-image" />
          </div>
          <button @click="nextImage" class="carousel-button next-button">&#8594;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const api = axios.create({
  baseURL: "https://chloydie.pythonanywhere.com",
});

export default {
  data() {
    return {
    visibleContent: null,
    suggestions: "",
    thoughts: "",
    rating: 5,
    successMessage: "",
    images: [
      "/images/gala.jpg", // Root-relative path
      "/images/pc pic.jpg"  // Root-relative path
    ],
    currentImage: 0,
    };
  },
  methods: {
    showContent(contentId) {
      this.visibleContent = contentId;
    },
    async submitSurvey() {
      try {
        const response = await api.post("/submit-survey", {
          suggestions: this.suggestions,
          thoughts: this.thoughts,
          rating: this.rating,
        });

        if (response.status === 200) {
          this.successMessage = "Feedback submitted successfully!";
          this.suggestions = "";
          this.thoughts = "";
          this.rating = 5;
        } else {
          throw new Error("Failed to submit feedback.");
        } 
      } catch (error) {
        console.error("Error submitting survey:", error);
        this.successMessage = "Failed to submit feedback.";
      }
    },
    nextImage() {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    },
    prevImage() {
      this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
    },
  },
}
</script>

<style>
body {
    font-family: sans-serif;
    margin: 0;
    overflow-x: hidden; 
    background: url('../components/images/bluegalaxy.gif') no-repeat center center fixed;
    background-size: cover;
    color: #eee; 
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    position: relative;
}

#container {
    background-color: rgba(0, 0, 0, 0.7); 
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); 
    max-width: 800px;
    text-align: center;
    backdrop-filter: blur(5px); 
    border: 1px solid rgba(255, 255, 255, 0.1); 
}

#profile-image {
    width: 150px;
    height: auto;
    display: block; 
    margin: 0 auto 20px; 
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

h2 {
    color: #ccf;
    margin-bottom: 15px;
}

p, ul, table {
    font-size: 16px;
    line-height: 1.6;
    text-shadow: 1px 1px 2px #000; 
}

.button-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-top: 25px;
    width: 100%; 
    box-sizing: border-box;
}

button {
    padding: 12px 20px;
    background-color: rgba(50, 100, 150, 0.6); 
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    min-width: 120px; 
    text-align: center;
}

button:hover {
    background-color: rgba(70, 120, 170, 0.8);
}

.popup {
    display: none;
    position: fixed;
    z-index: 2; 
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.7); 
    backdrop-filter: blur(3px);
}

.popup-content {
    background-color: rgba(20, 20, 50, 0.9); 
    margin: 10% auto;
    padding: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 80%;
    max-width: 600px;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
}

.hidden-content {
    display: none;
}

.close-button {
    position: absolute;
    top: 15px;
    right: 25px;
    font-size: 30px;
    font-weight: bold;
    color: #ddd;
    cursor: pointer;
    text-shadow: none;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 16px;
    color: #eee;
}

table th,
table td {
    border: 1px solid #444;
    padding: 10px;
    text-align: left;
}

table th {
    background-color: rgba(50, 100, 150, 0.6);
    color: white;
}

.image-gallery {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 10px;
    flex-wrap: wrap;
}

.carousel {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
    max-width: 100%;
    overflow: hidden;
}

.carousel-image {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    transition: transform 0.5s ease; 
}

.carousel-button {
    background-color: rgba(50, 100, 150, 0.6);
    padding: 10px 15px;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.carousel-button:hover {
    background-color: rgba(70, 120, 170, 0.8);
}

.prev-button {
    position: absolute;
    left: 10px;
}

.next-button {
    position: absolute;
    right: 10px;
}

.image-gallery img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}


.survey-form {
    margin-top: 20px;
    background: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

 .survey-form h3 {
    color: #ccf;
    margin-bottom: 15px;
}

.survey-form label {
    display: block;
    margin-bottom: 10px;
    color: #eee;
    font-size: 14px;
}

.survey-form input[type="text"],
.survey-form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #555;
    border-radius: 5px;
    background: #222;
    color: #eee;
}

.survey-form textarea {
    resize: vertical;
}

.rating {
    display: flex;
gap: 5px;
    margin-bottom: 15px;
}

.rating input {
    display: none;
}

.rating label {
    font-size: 24px;
    color: #666;
    cursor: pointer;
}

.rating input:checked ~ label,
.rating input:hover ~ label {
    color: #ffcc00;
}

.submit-button {
    background-color: rgba(50, 100, 150, 0.6);
    padding: 10px 15px;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: rgba(70, 120, 170, 0.8);
}
</style>
