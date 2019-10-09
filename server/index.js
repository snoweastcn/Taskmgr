const express = require('express')
const bodyParser = require('body-parser')

const app = express();

const router = express.Router()

router.get('/projects', function (req, res) {
  res.json([
    {
      "id": "1",
      "name": "企业协作平台",
      "desc": "这是一个企业内部项目",
      "coverImg": "/assets/images/kitten-cosmic.png",
      "members": [
        "1",
        "2"
      ]
    },
    {
      "id": "2",
      "name": "企业协作平台",
      "desc": "这是一个企业内部项目",
      "coverImg": "/assets/images/kitten-cosmic.png",
      "members": [
        "1"
      ]
    },
  ])
})

app.use(router)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

module.exports = app.listen(port, () => {
  console.log(`服务已启动，端口号：http://localhost:${port}，停止服务按Ctrl+C`)
})