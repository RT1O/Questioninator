<template>
  <div>
    <b-field v-for="option in getPollOptions" :key="option.id" class="has-text-left">
      <b-radio
        :native-value="option.id"
        v-model="selectedOptionId"
        class="is-left"
      >{{ option.name }}</b-radio>
    </b-field>

    <hr />

    <div class="level is-mobile">
      <div class="level-left">
        <b-button @click="submitSelectedOption" type="is-primary" class="is-pulled-left">Submit</b-button>
      </div>

      <div class="level-right">
        <b-button @click="$router.push('/')" icon-left="home" />
        <b-button
          @click="$store.commit('TOGGLE_RESULTS')"
          type="is-secondary"
          class="is-pulled-right"
          icon-left="format-list-bulleted"
        >Results</b-button>
        <b-button type="is-secondary" class="is-pulled-right" icon-left="share" @click="share">Share</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "PollOptions",
  data() {
    return {
      selectedOptionId: -1
    };
  },
  computed: {
    ...mapState(["hasAnswered"]),
    ...mapGetters(["getPollOptions"])
  },
  methods: {
    submitSelectedOption() {
      if (this.selectedOptionId < 0) return;

      this.$store
        .dispatch("submitPollAnswer", {
          pollId: this.$route.params.id,
          optionId: this.selectedOptionId
        })
        .catch(err => {
          if (err.response.status != 429) {
            return this.$store.dispatch("navigateToErrorPage", {
              status: 500,
              message: "Something went wrong while submitting your answer"
            });
          }
          return this.$buefy.toast.open({
            message: `You have already answered this poll!`,
            position: "is-bottom",
            type: "is-danger"
          });
        });
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
  },
  mounted() {
    this.$root.$on("resetOptions", () => {
      this.selectedOptionId = -1;
    });
  }
};
</script>

<style lang="scss">
.radio {
  margin: 15px 5px;
  word-break: break-word;
  font-family: "Lexend Exa", sans-serif;
}
</style>