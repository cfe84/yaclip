declare module yaclip {
  export interface Command {
    name: string,
    alias?: string,
    type: StringConstructor | BooleanConstructor | StringConstructor[],
    optional?: boolean,
    subcommands?: Command[],
    typeLabel?: string,
    description?: string,
    multiple?: boolean
  }

  export interface ParserOptions {
    dashesAreOptional: boolean
  }

  export type Parser = (parameters: string[]) => ParsingResult

  export interface OptionValue {
    value: string,
    [subcommandidx: string]: OptionValue | OptionValue[] | string
  }

  export interface ParsingResult {
    [idx: string]: OptionValue | OptionValue[]
  }

  export function commandLineParser(commands: Command[], options: ParserOptions): Parser;

  export function parseCommandLine(commands: Command[], options: ParserOptions): ParsingResult;

}
