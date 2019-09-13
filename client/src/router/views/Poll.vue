<template>
  <div class="section is-paddingless">
    <div
      class="columns is-marginless is-mobile is-full-height is-vcentered is-centered has-text-left"
    >
      <div class="column is-narrow-tablet">
        <div v-if="poll != null" class="box is-mobile">
          <h1 class="title is-3 is-paddingless">{{ poll.question }}</h1>
          <hr />

          <div v-if="!showResults">
            <PollOptions />
          </div>
          <div v-else>
            <PollResults />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PollOptions from "@/components/poll/PollOptions";
import PollResults from "@/components/poll/PollResults";

import { mapState, mapGetters } from "vuex";

export default {
  name: "Poll",
  components: { PollOptions, PollResults },
  computed: {
    ...mapState(["poll", "showResults"]),
    ...mapGetters([
      "getCurrentPollId",
      "getPollOptions",
      "getTotalAnsweredOptions"
    ])
  },
  mounted() {
    this.$store
      .dispatch("loadCurrentPoll", this.$route.params.id)
      .catch(err => {
        this.$store.dispatch("navigateToErrorPage", {
          status: 404,
          message: "Page not found"
        });
      });
  }
};
</script>

<style lang="scss">
.title {
  font-family: "Lexend Exa", sans-serif;
}
</style>