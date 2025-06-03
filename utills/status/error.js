export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFound extends AppError {
    constructor(message = 'Not Found') {
        super(message, 404);
        this.name = 'NotFound';
    }
    toJSON() {
        return { message: this.message, statusCode: this.statusCode };
      }
}


export class ItemNotFound extends AppError {
    constructor(message = 'Item Not Found') {
        super(message, 404);
        this.name = 'ItemNotFound';
    }
    toJSON() {
        return { message: this.message, statusCode: this.statusCode };
      }
}

export class BadRequest extends AppError {
    constructor(message = 'Bad Request') {
        super(message, 400);
        this.name = 'BadRequest';
    }
    toJSON() {
        return { message: this.message, statusCode: this.statusCode };
      }
}

export class Unauthorized extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
        this.name = 'Unauthorized';
    }
    toJSON() {
        return { message: this.message, statusCode: this.statusCode };
      }
}

export class Forbidden extends AppError {
    constructor(message = 'Forbidden') {
        super(message, 403);
        this.name = 'Forbidden';
    }
    toJSON() {
        return { message: this.message, statusCode: this.statusCode };
      }
}

export class InternalServerError extends AppError {
    constructor(message = 'Internal Server Error') {
        super(message, 500);
        this.name = 'InternalServerError';
    }
    toJSON() {
        return { message: this.message, statusCode: this.statusCode };
      }
}

export class NotImplemented extends AppError {
    constructor(message = 'Not Implemented') {
        super(message, 501);
        this.name = 'NotImplemented';
    }
    toJSON() {
        return { message: this.message, statusCode: this.statusCode };
      }
}

export class ServiceUnavailable extends AppError {
    constructor(message = 'Service Unavailable') {
        super(message, 503);
        this.name = 'ServiceUnavailable';
    }
    toJSON() {
        return { message: this.message, statusCode: this.statusCode };
      }
}

export class GatewayTimeout extends AppError {
    constructor(message = 'Gateway Timeout') {
        super(message, 504);
        this.name = 'GatewayTimeout';
    }
    toJSON() {
        return { message: this.message, statusCode: this.statusCode };
      }
}