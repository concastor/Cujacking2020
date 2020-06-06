<template>
  <b-container fluid>
    <b-row>
      <b-col class="q_text" sm="2">
        <label>{{ text }}</label>
      </b-col>
      <b-col>
        <b-form-input v-model="my_value" :type="type"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Question',
  props: [
    'text',
    'type',
    'var_name'
  ],
  data () {
    return {
      my_value: ''
    }
  }
}
</script>

<style scoped>

.q_text{
  text-align: left;
}

</style>
