const Redis = require('ioredis')
const redis = new Redis()

// Kiểm tra xem kết nối có thành công hay không
redis.on('connect', () => {
  console.log('Kết nối đến Redis thành công!')
})

// Kiểm tra các lỗi kết nối
redis.on('error', (err) => {
  console.error('Lỗi kết nối Redis:', err)
})

const addDelayEventOrder = ({ orderId, delay }) => {
  return new Promise((resolve, reject) => {
    redis.set(orderId, 'Cancel order', 'EX', delay, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

module.exports = {
  addDelayEventOrder,
}
