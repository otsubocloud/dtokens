const readline = require('readline')

exports.nodeQuestion = function (message, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question(message, function (answer) {
    callback(answer)
    rl.close()
  })
}
