import auth0 from 'auth0-js';

export default class AuthService {
    auth0 = new auth0.WebAuth({
        domain: 'codeunifier.auth0.com',
        clientID: 'CkKCODDhhhz0DOiAgrw3uGvH9I4wLm5y',
        redirectUri: 'http://localhost:5000/login/authorization',
        audience: 'https://codeunifier.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    });

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                window.location.href = '/';
            } else if (err) {
                console.log(err);
                window.location.href = '/unauthorized';
            }
        })
    }

    setSession(authResult) {
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    login() {
        this.auth0.authorize();
    }
}