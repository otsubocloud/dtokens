import formatHslCode from './formatHslCode'
import formatRgbCode from './formatRgbCode'
import hslToRgb from './hslToRgb'
import rgbToHexCode from './rgbToHexCode'

export default function convertFromHsl(
  hsl: { h: number; s: number; l: number },
  to: 'hsl' | 'rgb' | 'hex'
) {
  return to === 'hsl'
    ? formatHslCode(hsl)
    : to === 'rgb'
    ? formatRgbCode(hslToRgb(hsl))
    : rgbToHexCode(hslToRgb(hsl))
}
