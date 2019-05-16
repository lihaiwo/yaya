const fs = require('fs');

new Vue({
  el: '#app',
  data: {
    visible: false
  },
  methods: {
    produce: function () {
      fs.promises.readFile('admin/js/source.json','utf8')
        .then(dataSource => {
          dataSource = JSON.parse(dataSource);
          var min = 0;
          var max = 0;
          dataSource = dataSource.map(element => {
            // min = Math.min(min, element.count);
            // max = Math.max(max, element.count);
            return {
              count: 1,
              geometry: {"type":"Point","coordinates":element.lnglat}
            }
          });
          // dataSource[0].count = 100;
          console.log(min, max)
          return new Uint8Array(Buffer.from(JSON.stringify(dataSource)))
        })
        .then(data => {
          return fs.promises.writeFile('文件.txt',data)
        })
        .then( () => {
          console.log('文件已被保存');
        })
    },
    mock: function () {
     
      fs.promises.readFile('admin/js/data.json','utf8')
        .then(dataSource => {
          dataSource = JSON.parse(dataSource);
          var min = 0;
          var max = 0;
          dataSource.forEach(element => {
            min = Math.min(min, element.count);
            max = Math.max(max, element.count);
            element.count=1;
          });
          dataSource[0].count = 100;
          return new Uint8Array(Buffer.from(JSON.stringify(dataSource)))
        })
        .then(data => {
          return fs.promises.writeFile('文件.txt',data)
        })
        .then( () => {
          console.log('文件已被保存');
        })
    }
  }
})