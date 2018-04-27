
var errorCodes = {
    authErrors: {
        duplicateUser: {
            errorCode: 101,
            errorMsg: 'Duplicate User Error.'
        },

        userNotFound: {
            errorCode: 102,
            errorMsg: 'User not found.'
        },
        wrongPassword: {
            errorCode: 103,
            errorMsg: 'Wrong Password.'
        },
        notLoggedIn: {
            errorCode: 104,
            errorMsg: 'User not logged in.'
        },
        errorInLogout: {
            errorCode: 105,
            errorMsg: 'Error occured while trying to logout'
        }
    },
    generalErrors: {
        serverError: {
            errorCode: 201,
            errorMsg: 'Server error'
        },
        reqBodyUndefined: {
            errorCode: 202,
            errorMsg: 'Request Body is undefined.'
        }
    }
}

exports.errorCodes = errorCodes;