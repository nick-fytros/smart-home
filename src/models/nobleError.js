export default class NobleError extends Error {
    constructor(message){
        super(message);
        this.message = message;
        this.name    = 'Noble Error';
    }
}