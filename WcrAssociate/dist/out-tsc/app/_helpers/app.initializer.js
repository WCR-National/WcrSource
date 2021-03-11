import { User } from '../entities/user';
export function appInitializer(userService) {
    var _this = this;
    return function () { return new Promise(function (resolve) {
        // attempt to refresh token on app start up to auto authenticate
        user: User;
        if (localStorage.getItem('jwtToken')) {
            var user = JSON.parse(localStorage.getItem('jwtToken'));
            if (user.type == "1") { //associate
                var credentials = {};
                credentials.email = user.email;
                _this.userService.associateLoginSessionActivate("", credentials, user.id)
                    .then(function (data) {
                    debugger;
                    if (data.d == "1") {
                        user.token = _this.token();
                        user.email = credentials.email;
                        user.id = user.id;
                        user.type = "1";
                        userService.setAuth(_this.user);
                    }
                    else {
                        _this.userService.purgeAuth();
                    }
                });
            }
            else if (user.type == "2") {
                debugger;
                var credentials = {};
                credentials.email = user.email;
                _this.userService.consumerLoginSessionActivate("", credentials, user.id)
                    .then(function (data) {
                    if (data.d == "1") {
                        user.token = _this.token();
                        user.email = credentials.email;
                        user.id = user.id;
                        user.type = "2";
                        userService.setAuth(_this.user);
                    }
                    else {
                        _this.userService.purgeAuth();
                    }
                });
            }
        }
        else {
            // Remove any potential remnants of previous auth states
            _this.purgeAuth();
            //let url = ((this.platformLocation as any).location.href).replace(location.origin, '');
            //this.ngZone.run(() => this.router.navigate([url]));
        }
    }); };
}
//# sourceMappingURL=app.initializer.js.map