<template>
  <div class="wrapper">
      <router-view/>
      <nav/>
  </div>
</template>

<script>
import nav from './components/widget/nav'
export default {
  components: {
    nav
  },
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
    align-items: center;
  }
</style>
