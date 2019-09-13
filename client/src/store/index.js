import Vue from 'vue'
import Vuex from 'vuex'

import router from '../router/index'

import { RepositoryFactory } from '@/http/index'
const PollRepository = RepositoryFactory.get('polls')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    poll: null,
    hasAnswered: false,
    showResults: false
  },
  getters: {
    getCurrentPollId: (state) => {
      return state.route.params.id
    },

    getPollOptions: (state, getters) => {
      return state.poll._options
        .map((option) => {
          if (option.answers == 0) {
            option.percentage = 0
          } else {
            option.percentage = Math.floor(
              (option.answers / getters.getTotalAnsweredOptions) * 100
            )
          }
          return option
        })
        .sort((a, b) => a.id - b.id)
    },

    getTotalAnsweredOptions: (state) => {
      return state.poll._options
        .map((option) => option.answers)
        .reduce((accumulator, value) => accumulator + value)
    }
  },
  actions: {
    updateOption: ({ commit, getters }, optionId) => {
      commit(
        'UPDATE_OPTIONS',
        getters.getPollOptions.map((option) => {
          if (option.id === optionId) option.answers += 1
          return option
        })
      )
    },

    submitPollAnswer: ({ commit, dispatch }, { pollId, optionId }) => {
      return new Promise((resolve, reject) => {
        PollRepository.submitAnswer(pollId, optionId)
          .then(() => {
            dispatch('updateOption', optionId)

            commit('TOGGLE_RESULTS')
            commit('SET_HAS_ANSWERED')

            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    createPollAndRedirect: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        PollRepository.create(payload)
          .then((res) => {
            commit('HIDE_RESULTS')
            router.push({ name: 'poll', params: { id: res.data.poll.id } })
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    navigateToErrorPage: (_, error) => {
      router.push({ name: 'error', query: error })
    },

    loadCurrentPoll: ({ commit, getters }, pollId) => {
      return new Promise((resolve, reject) => {
        PollRepository.get(pollId)
          .then((res) => {
            commit('SET_CURRENT_POLL', res.data.poll)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  mutations: {
    TOGGLE_RESULTS: (state) => {
      state.showResults = !state.showResults
    },

    HIDE_RESULTS: (state) => {
      state.showResults = false
    },

    SET_CURRENT_POLL: (state, poll) => {
      state.poll = {
        question: poll.question,
        _options: poll.Options
      }
    },

    SET_HAS_ANSWERED: (state) => {
      state.hasAnswered = true
    },

    UPDATE_OPTIONS: (state, options) => {
      state.poll._options = options
    }
  }
})
