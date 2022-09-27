const validTokens = ["abc123", "xyz789"];

const isValidSignInToken = (token) => {
    return validTokens.includes(token);
}

export { isValidSignInToken };