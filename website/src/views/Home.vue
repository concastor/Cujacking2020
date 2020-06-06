<template>
  <div class="home">
    <CourseForm></CourseForm>
  </div>
</template>

<script>
// @ is an alias to /src
import CourseForm from '@/components/CourseForm.vue'

export default {
  name: 'Home',
  components: {
    CourseForm
  }
}
</script>
