const timeGenerate = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 3);
    return date.getTime();
}


// module exports
module.exports = timeGenerate;