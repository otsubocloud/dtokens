import { DefineTokensSource } from '../../common/config/types'
import validateOutputPath from '../../common/utils/validateOutputPath'
import consoleError from '../../common/fn/consoleError'
import writeFile from './writeFile'
import forEach from '../../common/utils/forEach'

export default function genJsonFile(
  source: DefineTokensSource,
  outfile: string
) {
  const { config } = source

  const outputJson: { [p: string]: any } = {
    tokens: source.tokens,
  }
  forEach(outputJson, (row, key) => {
    if (row === undefined) {
      delete outputJson[key]
    }
  })

  const code = JSON.stringify(outputJson, null, 2)

  const validOutfile = validateOutputPath(outfile, 'file')
  if (validOutfile) {
    writeFile(validOutfile, code)
  } else {
    consoleError(`"${outfile}" is invalid file path.`)
  }
}
