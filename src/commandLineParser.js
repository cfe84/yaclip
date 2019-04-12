const parser = (commands, {
        dashesAreOptional = false
    } = {}) => {
    const findCommand = (commandList, commandText) => {
        return commandList.find((command) => command.name === commandText);
    }

    const findAlias = (commandList, commandText) => {
        return commandList.find((command) => command.alias === commandText);
    }
    
    const isAlias = (commandTxt) => commandTxt.length === 2 && commandTxt[0] === "-";

    const isFullCommand = (commandTxt) => commandTxt.length > 2 && commandTxt.substring(0, 2) === "--";

    const processCommand = (res, commandLine, command) => {
        let value;
        if (command.type === Boolean) {
            value = true
        } else {
            if (commandLine.length === 0) {
                throw Error(`Expecting value for command ${command.name}`);
            }
            value = commandLine.shift();
        }
        const parsedCommand = {
            value
        };
        const nextCommandIsSubcommand = () => {
            const nextCommand = commandLine[0];
            const nextCommandIsAlias = !!isAlias(nextCommand) && !!findAlias(command.subcommands, nextCommand.substring(1));
            const nextCommandIsCommand = !!isFullCommand(nextCommand) && !!findCommand(command.subcommands, nextCommand.substring(2));
            return nextCommandIsAlias || nextCommandIsCommand;
        }
        while(commandLine.length > 0 && 
            command.subcommands &&
            nextCommandIsSubcommand()) {
            parseCommand(command.subcommands, parsedCommand, commandLine);
        }
        if (command.multiple) {
            if (res[command.name]) {
                res[command.name].push(parsedCommand);
            }
            else {
                res[command.name] = [parsedCommand];
            }
        } else {
            if (res[command.name]) {
                throw Error(`${command.name} expected only once`);
            }
            else {
                res[command.name] = parsedCommand;
            }
        }
    };


    const parseFullCommand = (commandList, commandTxt) => {
        commandTxt = commandTxt.substring(2);
        return findCommand(commandList, commandTxt);
    }

    const parseAlias = (commandList, commandTxt) => {
        commandTxt = commandTxt.substring(1);
        return findAlias(commandList, commandTxt);
    }

    const parseUnknown = (commandList, commandTxt) => {
        return findCommand(commandList, commandTxt) || 
            findAlias(commandList, commandTxt);
    }

    const parseCommand = (commandList, res, commandLine) => {
        if (commandLine.length === 0) {
            return;
        }
        let commandTxt = commandLine.shift();
        let command = null;
        const commandIsAlias = isAlias(commandTxt);
        const commandIsFullCommand = isFullCommand(commandTxt);

        if (!commandIsFullCommand && !commandIsAlias && !dashesAreOptional) {
            throw Error(`Incorrect parameter: ${commandTxt}`);
        }
        if (commandIsFullCommand) {
            command = parseFullCommand(commandList, commandTxt);
        }
        else if (commandIsAlias) {
            command = parseAlias(commandList, commandTxt);
        } else if (dashesAreOptional) {
            command = parseUnknown(commandList, commandTxt);
        }
        if (!command) {
            throw Error(`Unknown command: ${commandTxt}`);
        }
        processCommand(res, commandLine, command);
    }

    const parseCommandLine = (commandLine) => {
        const commandLineCopy = commandLine.slice();
        const res = {};
        while(commandLineCopy.length > 0) {
            parseCommand(commands, res, commandLineCopy);    
        }
        return res;
    }
    return parseCommandLine;
}

module.exports = parser;