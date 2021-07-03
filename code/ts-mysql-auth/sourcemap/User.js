"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(username, image, _password) {
        this.username = username;
        this.image = image;
        this._password = _password;
    }
    User.prototype.getPassword = function () {
        return this._password;
    };
    User.prototype.getJsonObject = function () {
        return {
            username: this.username,
            image: this.image,
        };
    };
    return User;
}());
exports.default = User;
//# sourceMappingURL=User.js.map