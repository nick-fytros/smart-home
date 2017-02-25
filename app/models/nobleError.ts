/**
 * Should probably use an interface here
 */
export default class NobleError extends Error {
    public message: string;
    public name: string;

    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = 'Noble Error';
    }
}
