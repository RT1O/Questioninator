<template>
  <div>
    <div v-for="option in getPollOptions" class="has-text-left">
      <div class="columns is-vcentered is-mobile">
        <div class="column is-9 option-title">
          <p>{{ option.name }}</p>
        </div>
        <div class="column has-text-right option-title">
          <p>
            <strong>{{ option.answers }}</strong> total
          </p>
        </div>
      </div>

      <div class="columns is-gapless is-vcentered is-mobile">
        <div class="column">
          <b-progress :value="option.percentage" type="is-primary" size="is-large" />
        </div>
        <div class="column is-narrow">
          <b-tag type="is-dark">{{ option.percentage }}%</b-tag>
        </div>
      </div>

      <hr />
    </div>

    <div class="level is-mobile">
      <div class="level-left">
        <b-button
          @click="$store.commit('TOGGLE_RESULTS')"
          type="is-primary"
          class="is-pulled-left"
        >Answer</b-button>
      </div>
      <div>
        <b-button @click="$router.push('/')" icon-left="home" />
        <b-button class="is-pulled-right" type="is-secondary" icon-left="share" @click="share">Share</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "PollResults",
  computed: {
    ...mapState(["hasAnswered"]),
    ...mapGetters(["getPollOptions"])
  },
  methods: {
    goToOptions() {
      this.$store.commit("TOGGLE_RESULTS");
    },
    share() {
      this.$copyText(`http://poll.tozv.xyz/view/${this.$route.params.id}`).then(
        e => {
          this.$buefy.toast.open({
            message: `The URL has been copied to clipboard!`,
            position: "is-bottom",
            type: "is-white"
          });
        }
      );
    }
  }
};
</script>

<style lang="scss">
.progress {
  border-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.tag {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  font-family: "Lexend Exa", monospace;
  margin-bottom: 2px;
  min-width: 60px;
}

.progress,
.option-title {
  font-family: "Lexend Exa", sans-serif;
}

.option-title p {
  word-break: break-word;
}
</style>