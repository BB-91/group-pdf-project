const AWS_API = {
    PROTOCOL: "http://",
    DOMAIN: "localhost",
    PORT: 3050,
    PATH: "",

    getOrigin() {
        return this.PROTOCOL + this.DOMAIN + (this.PORT ? `:${this.PORT}` : "")
    },

    getURL() {
        return this.getOrigin() + this.PATH;
    },
}

export default AWS_API;