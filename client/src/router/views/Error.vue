<template>
  <div>
    {{ error.status }}
    <br />
    {{ error.message }}
  </div>
</template>

<script>
export default {
  name: "Error",
  computed: {
    error() {
      let { status, message } = this.$route.query

      if (!status)
        status = '404'
      if (!message)
        message = 'Page not found'

      return { status, message }
    }
  }
};
</script>

<style>
</style>