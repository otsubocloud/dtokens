export default function isPassKey(key: string){
  return !!key.match(/^\([a-zA-Z0-9-_]+\)$/)
}