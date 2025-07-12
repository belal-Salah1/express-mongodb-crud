class AppError extends Error{
    constructor(message , statusCode, statusText){
        super();
    }
    
    create(message , statusCode, statusText){
        this.message = message;
        this.statusCode = statusCode;
        this.statusText = statusText;
        return this;
    }
}

module.exports = new AppError();

