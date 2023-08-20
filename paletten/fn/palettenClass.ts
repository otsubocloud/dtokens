import { PalettenFunc, Options } from '../types'
import _paletten from '../index'

type CommonConfig = Options

export default class Paletten {
  config: CommonConfig | undefined = undefined

  constructor(commonConfig: CommonConfig) {
    this.config = commonConfig
  }

  paletten: PalettenFunc = (value, options) => {
    return _paletten(value, { ...this.config, ...options })
  }
}
