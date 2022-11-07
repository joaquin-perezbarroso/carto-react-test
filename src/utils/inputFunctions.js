export default function dimensionValidator(dim) {

    if (dim === undefined || dim === '') {
        return
    }

    const value = parseInt(dim)
    if (isNaN(value) || value > 10 || value < 1) {
        throw new Error("Wrong value.")
    }
    else {
        return value
    }
}