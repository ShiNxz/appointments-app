import axios from 'axios'

export default (url: string) => axios.get(url).then((res) => res.data)
