import Repository from './Repository'

export default {
  /*
  Get a specific poll by it's id
  */
  get(id) {
    return Repository.get(`get/${id}`)
  },

  /*
  Create a new poll
  */
  create(options) {
    return Repository.post('create', options)
  },

  /*
  Submit an answer to the poll, by specifying the answerId
  */
  submitAnswer(id, optionId) {
    return Repository.post(`${id}/submit`, { optionId })
  }
}
