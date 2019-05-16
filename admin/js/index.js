const fs = require('fs');

new Vue({
  el: '#app',
  data: {
    visible: false
  },
  methods: {
    show: function () {
      this.visible = true;
    },
    produce: function () {
      const data = new Uint8Array(Buffer.from('Node.js中文网'));
      fs.writeFile('文件.txt', data, (err) => {
        if (err) throw err;
        console.log('文件已被保存');
      });
    }
  }
})