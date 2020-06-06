<template>
  <b-container fluid>
    <b-row class="q-row" v-for="q in questions" :key="q.var_name">
      <Question class="question" :text="q.text" :type="q.type" :var_name="q.var_name"></Question>
    </b-row>
  </b-container>
</template>

<script>
import Question from './Question'

export default {
  name: 'CourseForm',
  props: ['questions']
  components: {
    Question
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

.question{
  width: 100%;
}

</style>
