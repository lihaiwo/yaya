<template>
  <div>
    <Button type="primary" @click="sendChange">发送消息</Button>
  </div>
</template>
<script>
import { sendChange } from '@/api/socket'
export default {
  data () {
    return {}
  },
  methods: {
    sendChange () {
      sendChange().then(res => {
        alert(res)
      })
    }
  }
}
</script>
