export default function NoneImageLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 75}`
}
