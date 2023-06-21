function timeGenerate() {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 3);
    return getTime();
}


// module exports
module.exports = timeGenerate;