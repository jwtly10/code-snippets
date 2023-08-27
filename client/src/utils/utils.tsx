function minify(string: string) {
    return string.replace(/\s+/g, ' ').trim()
}

export default { minify }
