export default function pxToRem(px: string | number) {
  const num = (() => {
    const p = Number(px)
    const n = isNaN(p)
      ? Number(px.toString().replace('px', ''))
      : p
    return isNaN(n) ? 0 : n
  })()
  return (1 / 16) * (num ?? 0) + 'rem'
}
