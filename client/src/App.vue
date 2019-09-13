<template>
  <div id="app" class="is-centered has-text-centered">
    <router-view />
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Made by
          <a href="#">Toms Zvirbulis</a>
        </p>
        <a href="https://bulma.io">
          <img
            src="https://bulma.io/images/made-with-bulma--black.png"
            alt="Made with Bulma"
            width="128"
            height="24"
          />
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
</style>