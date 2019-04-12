Yet another command line parser. This one
supports subcommands though.

# Usage

```js
const parseCommandLine = require("yaclip");

const subcommands = [
    { name: 'subcommand', alias: "s", type: String, multiple: false},
]

const commands = [
    { name: 'command', alias: "c", type: String, multiple: false, subcommands},
    { name: 'other', alias: "0", type: String, multiple: false}
];

const arguments = parseCommandLine(commands);
console.log(arguments);
```

```sh
node example.js \
    --command "This is the command" \
    --subcommand "this goes in the subsection of command" \
    --other "this is parsed nicely"
```

It has limitations, I built it for [bounce](https://www.npmjs.com/package/bounce-server).

# Dash optionality

If you prefer your commands without dashes, specify option `dashesAreOptional` to true
when instantiating the parser:

```js
const arguments = parseCommandLine(commands, { dashesAreOptional: true });
console.log(arguments);
```

```sh
node example.js \
    command "This is the command" \
    --subcommand "this goes in the subsection of command" \
    other "this is parsed nicely"
```