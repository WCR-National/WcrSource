//import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
//import { JwtHelperService  } from '@auth0/angular-jwt';
//import { DOM } from '../../lib/dom-init';
//import { myConfig } from './auth.config';
//import { StorageService } from '../storage/storage.service';
//import * as auth0 from 'auth0-js';

//@Injectable()
//export class AuthService {

//    webAuth = new auth0.WebAuth({
//        clientID: myConfig.clientID,
//        domain: myConfig.domain,
//        responseType: myConfig.responseType,
//        audience: myConfig.audience,
//        redirectUri: window.location.origin + '/login',
//        scope: 'openid'
//    });

//    constructor(private router: Router, private store: StorageService, private dom: DOM) {
//        let h = window.location.hash;
        
//        if (h && h != '') {
//            h = h.replace(/^#?\/?/, '');
//            let o = h.split('&').reduce(function (prev, curr) {
//                var param = curr.split('=');
//                prev[param[0]] = param[1];
//                return prev;
//            }, {});

//            if (o['id_token']) {
//                localStorage.setItem('id_token', o['id_token']);
//            }

//            if (o['access_token']) {
//                localStorage.setItem('access_token', o['access_token']);
//            }

//            if (o['error']) {
//                iziToast.error({ title: o['error'], message: decodeURIComponent(o['error_description']), position: 'bottomRight' });
//            }
//        }
//    }


//    /**
//     * USER AND EMAIL PASSWORD CONNECTION
//     */

//    public login(usr, pwd) {
//        if (usr && usr.trim() != '' && pwd && pwd.trim() != '') {
//            this.webAuth.redirect.loginWithCredentials({
//                connection: 'Username-Password-Authentication',
//                scope: 'openid',
//                username: usr,
//                password: pwd,
//            }, function (err) {
//                if (err) iziToast.error({ title: 'Error', message: err.error_description, position: 'bottomRight' });
//            });
//        }
//    };

//    public register(usr, pwd, inv_tk?: string) {
//        if (usr && usr.trim() != '' && pwd && pwd.trim() != '') {
//            this.webAuth.redirect.signupAndLogin({
//                connection: 'Username-Password-Authentication',
//                email: usr,
//                password: pwd,
//                scope: 'openid given_name family_name name picture gender email phone_number user_id',
//                redirectUri: window.location.origin + (inv_tk ? '/welcomeinvite' : '/registersubscription'),
//            }, function (err) {
//                if (err) iziToast.error({ title: 'Error', message: err.description, position: 'bottomRight' });
//            });
//        }
//    };

//    public changePassword(usr) {
//        this.webAuth.changePassword({
//            connection: 'Username-Password-Authentication',
//            email: usr,
//        }, function (err, resp) {
//            if (err) iziToast.error({ title: 'Error', message: err.error_description, position: 'bottomRight' });
//            else iziToast.success({ title: 'OK', message: 'Email was succesfully sent', position: 'bottomRight' });
//        });
//    };

//    /**
//     * SOCIAL CONNECTION
//     */
//    public socialLogin(connectionStringSocial: string) {
//        this.webAuth.authorize({
//            connection: connectionStringSocial,
//            sso: true
//        }, function (err, authResult) {
//            if (err) iziToast.error({ title: 'Error', message: err.error_description, position: 'bottomRight' });
//        });
//    };

//    public socialRegister(connectionStringSocial: string, inv_tk?: string) {
//        this.webAuth.authorize({
//            connection: connectionStringSocial,
//            scope: 'openid given_name family_name name picture gender email phone_number user_id',
//            redirectUri: window.location.origin + (inv_tk ? '/welcomeinvite' : '/registersubscription')
//        }, function (err) {
//            if (err) iziToast.error({ title: 'Error', message: err.error_description, position: 'bottomRight' });
//        });
//    };

//    public authenticated(): boolean {
//        return !new JwtHelperService().isTokenExpired(this.store.localGet('id_token'));
//    };

//    public logout() {
//        // Remove token from localStorage
//        this.clearInfo();
//    };

//    public getProfile(): void {
//        const accessToken = localStorage.getItem('access_token');
//        if (accessToken) {
//            this.webAuth.client.baseOptions.scope = 'openid profile';
//            this.webAuth.client.userInfo(accessToken, (err, profile) => {
//                localStorage.setItem('profile_reply', "1");
//                if (err) alert("something went wrong: " + err.error_description);
//                else localStorage.setItem('profile', JSON.stringify(profile));
//            });

//            this.webAuth.scope = 'openid';
//        }
//    }

//    clearInfo() {
//        // Remove tokens and expiry time from localStorage
//        this.store.localRemove('id_token');
//        this.store.localRemove('access_token');
//        this.store.localRemove('profile');
//        this.store.sessionClear();
//        this.dom.removeId("agencycss");
//    }

//}
