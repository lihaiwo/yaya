<template>
  <div class="welcome">
  </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  data () {
    return {}
  },
  methods: {
  },
  mounted () {
    window.setTimeout(() => {
      this.$router.push('/mood')
    }, 3000);
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
