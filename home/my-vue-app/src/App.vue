<template>
  <div id="app">
    <h1>My Personal Website</h1>
    <SurveyForm />
  </div>
</template>

<script>
import SurveyForm from "./components/SurveyForm.vue";

export default {
  components: {
    SurveyForm,
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #0d1117;
  color: white;
}
</style>
