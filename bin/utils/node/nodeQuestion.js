import * as readline from 'readline'

export default function nodeQuestion(message, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question(message, function (answer) {
    callback(answer)
    rl.close()
  })
}
