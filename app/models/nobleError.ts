/**
 * Should probably use an interface here
 * by Nikos Fytros
 */
export default class NobleError extends Error {
    message: string;
    name: string;

    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = 'Noble Error';
    }
}
