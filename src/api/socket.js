import axios from '@/libs/api.request'

export const sendChange = () => {
  return axios.request({
    url: 'http://localhost:7100/socket/push/20',
    method: 'get',
    params: {
      message: 'aaaa'
    }
  })
}