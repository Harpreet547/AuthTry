
AppConstants = {
    messages: {
        login: {
            serverError: 'Login: Server error.',
            userNotFound: 'Login: User not found',
            loginSuccess: 'Login: Success.',
            wrongPassword: 'Login: Wrong password'
        },
        signup: {
            errorSavingUser: 'Signup: Unable to save user to DB',
            signupSuccess: 'Signup: User saved to DB'
        },
        logout: {
            usserNotLoggedIn: 'Logout: User not logged in.',
            errInLogout: 'Logout: Error Occured while trying to logout.',
            loggedOut: 'Logout: Successfully loggedout'
        },
        request: {
            bodyNull: 'Request Error: Request body was nil.'
        }
    }
}

exports.appConstants = AppConstants;