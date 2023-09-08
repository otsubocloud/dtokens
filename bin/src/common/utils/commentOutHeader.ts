export const commentOutHeader = (
  str: string,
  type: 'line' | 'lines' = 'line'
) => {
  return type === 'line'
    ? '// - - - - -\n' + `// ${str}\n`
    : `/* - - - - -\n` + `${str}\n` + '- - - */\n'
}
export const commentOutTitle = (
  str: string,
  type: 'line' | 'lines' = 'line'
) => {
  return type === 'line' ? `// ${str}\n` : `/* ${str} */\n`
}
