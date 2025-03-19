export default function imageLoader({ src, width, quality }) {
    // For local images (starting with /)
    if (src.startsWith('/')) {
        // Return the source as is for static exports
        return src;
    }
    // For external images
    return src;
}