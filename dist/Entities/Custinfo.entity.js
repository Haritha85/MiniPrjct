"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Custinfo = void 0;
var typeorm_1 = require("typeorm");
var Customer_entity_1 = require("./Customer.entity");
var Custinfo = /** @class */ (function () {
    function Custinfo() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Custinfo.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Custinfo.prototype, "additionalinfo", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Customer_entity_1.Customer; }, function (customer) { return customer.custinfo; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Customer_entity_1.Customer)
    ], Custinfo.prototype, "customer", void 0);
    Custinfo = __decorate([
        (0, typeorm_1.Entity)()
    ], Custinfo);
    return Custinfo;
}());
exports.Custinfo = Custinfo;
