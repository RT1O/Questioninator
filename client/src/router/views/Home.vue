<template>
  <div class="section is-paddingless">
    <div
      class="columns is-marginless is-mobile is-full-height is-vcentered is-centered has-text-left"
    >
      <div class="column is-narrow-tablet is-paddingles">
        <div class="box">
          <b-field>
            <b-input
              v-model="question"
              type="text"
              size="is-large"
              class="title"
              placeholder="Type your question here"
            />
          </b-field>

          <hr />

          <div class="options">
            <b-field v-for="(option, i) in options" :key="i">
              <b-input
                @input="handleOptionInput"
                v-model="options[i]"
                type="text"
                placeholder="Enter an option here"
              />
            </b-field>
          </div>

          <hr />
          <b-field>
            <b-button class="is-outlined is-fullwidth" @click="handleSubmit">Create Poll</b-button>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      question: null,
      options: []
    };
  },
  methods: {
    handleSubmit() {
      if (!this.question || this.question === "") {
        return this.$buefy.toast.open({
          message: `You need to enter a question!`,
          position: "is-bottom",
          type: "is-white"
        });
      }

      const options = this.options.filter(a => a !== null);

      if (options.length < 2) {
        return this.$buefy.toast.open({
          message: `You need to enter atleast 2 options!`,
          position: "is-bottom",
          type: "is-white"
        });
      }

      this.$store
        .dispatch("createPollAndRedirect", {
          options,
          question: this.question
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("navigateToErrorPage", {
            status: 500,
            message: "Something went wrong while creating the poll"
          });
        });
    },
    openToast() {},
    handleOptionInput() {
      this.options = this.options.map(a => (a === "" ? null : a));

      const lastIndex = this.options.length - 1;

      if (
        this.options[lastIndex] === null &&
        this.options[lastIndex - 1] === null
      ) {
        if (lastIndex == 2) return;
        return this.$delete(this.options, lastIndex);
      }

      if (lastIndex == 9) return;

      if (this.options[lastIndex] !== null) {
        return this.$set(this.options, lastIndex + 1, null);
      }
    }
  },
  mounted() {
    for (var i = 0; i < 3; i++) {
      this.$set(this.options, i, null);
    }
  }
};
</script>

<style lang="scss">
.header {
  padding: 15px;
}
.header .title {
  width: 100%;
  color: #fff;
  font-family: "Lexend Exa", sans-serif;
}
.options {
  margin-bottom: 20px;
  max-height: 30vh;
  overflow-y: auto;
}

/* Scrollbar */
.options::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.options::-webkit-scrollbar-track {
  background: #fff;
}

/* Handle */
.options::-webkit-scrollbar-thumb {
  background: #d3d3d3;
  border-left: 6px #fff solid;
}

/* Handle on hover */
.options::-webkit-scrollbar-thumb:hover {
  background: #d3d3d3;
}
</style>
