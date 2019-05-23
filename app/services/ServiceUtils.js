export class TApiCallFailedException extends Error {
    constructor(message, statusCode, response) {
        super(message);
        this.statusCode = statusCode;
        this.response = response;
    }
}

export class OauthCallFailedException extends Error {
    constructor(message, statusCode, response) {
        super(message);
        this.statusCode = statusCode;
        this.response = response;
    }
}

export const getContent = (response) => {
    let message = '';
    if (response.ok) {
        return response.body;
    } else {
        if (response && response.body && response.body.error) {
            message = response.body.error;
        } else {
            message = 'Unexpected error occured. please try again';
        }
        throw new TApiCallFailedException(message, response.status, response);
    }
};

export const getAccessToken = (response) => {
    response = response.body || response;
    if (!response.error) {
        return response.data.access_token;
    } else {
        throw new OauthCallFailedException(
            response.error_description
                ? response.error_description
                : `Unexpected error occured. please try again`,
            0,
            response
        );
    }
};
