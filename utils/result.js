class Result {
    constructor(data) {
        this.data = data || undefined
        this.error = undefined
        this.status = 0
    }

    setData(data) {
        this.data = data
    }

    setError(error, status) {
        this.error = { message: error }
        this.status = status || 1
    }
}

module.exports = Result
