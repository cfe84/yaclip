const commandLineParser = require("./commandLineParser");

const parseCommandLine = (commands, { dashesAreOptional = false } = {}) => {
    const args = process.argv.slice(2);
    const options = {
        dashesAreOptional
    };
    const parse = commandLineParser(commands, options);
    return parse(args);
}

module.exports = parseCommandLine;