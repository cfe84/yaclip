const commandLineParser = require("./commandLineParser");

const parseCommandLine = () => {
    const args = process.argv.slice(2);
    return commandLineParser(args);
}

module.exports = parseCommandLine;