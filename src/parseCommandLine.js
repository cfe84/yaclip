const commandLineParser = require("./commandLineParser");

const parseCommandLine = (commands) => {
    const args = process.argv.slice(2);
    const parse = commandLineParser(commands);
    return parse(args);
}

module.exports = parseCommandLine;