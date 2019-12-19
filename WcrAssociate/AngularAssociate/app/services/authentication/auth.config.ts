interface AuthConfiguration {
    domain: string,
    audience: string,
    clientID: string,
    responseType: string
}

export const myConfig: AuthConfiguration = {
    domain: 'auth.resident.uk.com',
    //domain: 'resident.eu.auth0.com',
    audience: 'https://resident.eu.auth0.com/userinfo',
    clientID: '7BG2o3Z4QcHpJ3vOBEw0e6JPA1WSfyy0',
    responseType: 'token id_token'
};