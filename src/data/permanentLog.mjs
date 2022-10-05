const permanentLog = (...strings) => {
    console.log(...strings);
}


const errorLog = (...strings) => {
    permanentLog(...strings);
}

export { errorLog, permanentLog };