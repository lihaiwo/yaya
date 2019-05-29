<template>
  <div class="welcome">
    <Button @click="goVideo">实时通讯</Button>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    goVideo () {
      this.$router.push('/video')
    }
  }
}
</script>

<style lang="less" scoped>
.welcome {
  height: 100%;
  background-size: cover;
  background-image: url('/img/bg/2.jpg')
}
</style>
