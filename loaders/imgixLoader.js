export default function imgixLoader({ src, width, quality }) {
  return `https://kuderiavetsanton.imgix.net/${src}?w=${width}&q=${
    quality || 75
  }`;
}
