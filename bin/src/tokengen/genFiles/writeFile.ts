import * as _path from 'path'
import * as fs from 'fs'
import consoleError from '../../common/fn/consoleError'

export default function writeFile(
  path: string,
  data: string,
  consoleOnly?: boolean
) {
  const dirUrl = getFileDirectoryPath(path)
  if (!dirUrl) {
    consoleError(`"${path}" is invalid path.`)
    return
  }
  if (!fs.existsSync(dirUrl)) {
    fs.mkdirSync(dirUrl, { recursive: true })
  }

  if (consoleOnly) {
    console.log(data)
    return
  }
  fs.writeFileSync(_path.resolve(path), data, 'utf8')
}

const isDirectory = (path: string) => {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    return true
  }
  return false
}

const getFileDirectoryPath = (path: string) => {
  // if path is directory
  if (path.match(/.+\/$/)) {
    return null
  } else {
    return path
      .split('/')
      .filter(str => !!str)
      .slice(0, -1)
      .join('/')
  }
}
