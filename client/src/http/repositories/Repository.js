import axios from 'axios'
import config from '@/config'

const baseDomain = config.baseDomain
const baseURL = baseDomain + '/poll/'

export default axios.create({
  baseURL
})
