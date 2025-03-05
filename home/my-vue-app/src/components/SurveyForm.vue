<template>
  <div>
    <h2>Website Feedback Survey</h2>
    <form @submit.prevent="submitSurvey">
      <label>What changes would you suggest?</label>
      <textarea v-model="suggestions"></textarea>

      <label>What do you like about this website?</label>
      <textarea v-model="thoughts"></textarea>

      <label>Rate the design, colors, and ease of use:</label>
      <select v-model="rating">
        <option v-for="n in 5" :key="n" :value="n">{{ n }} Stars</option>
      </select>

      <button type="submit">Submit Feedback</button>
      <p v-if="successMessage">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      suggestions: "",
      thoughts: "",
      rating: 5,
      successMessage: "",
    };
  },
  methods: {
    async submitSurvey() {
      try {
        const response = await axios.post("https://ominous-space-journey-wr9p4r54qqg2w4w-5000.app.github.dev/submit-survey", {
          suggestions: this.suggestions,
          thoughts: this.thoughts,
          rating: this.rating,
        });
        if (response.status === 200) {
          this.successMessage = "Feedback submitted successfully!";
          this.suggestions = "";
          this.thoughts = "";
          this.rating = 5;
        }
      } catch (error) {
        console.error("Error submitting survey:", error);
        this.successMessage = "Failed to submit feedback.";
      }
    },
  },
};
</script>

<style scoped>
textarea {
  display: block;
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
}
button {
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
