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
exports.Customer = void 0;
var typeorm_1 = require("typeorm");
var Order_entity_1 = require("./Order.entity");
var Custinfo_entity_1 = require("./Custinfo.entity");
var Supplier_entity_1 = require("./Supplier.entity");
var Customer = /** @class */ (function () {
    function Customer() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Customer.prototype, "customer_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Customer.prototype, "firstName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Customer.prototype, "lastName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Customer.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Customer.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Customer.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Order_entity_1.Order; }, function (order) { return order.customer; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Customer.prototype, "orders", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Custinfo_entity_1.Custinfo; }, function (custinfo) { return custinfo.customer; }, { onDelete: "CASCADE" }),
        __metadata("design:type", Custinfo_entity_1.Custinfo)
    ], Customer.prototype, "custinfo", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Supplier_entity_1.Supplier; }, function (supplier) { return supplier.customers; }),
        __metadata("design:type", Array)
    ], Customer.prototype, "supplier", void 0);
    Customer = __decorate([
        (0, typeorm_1.Entity)()
    ], Customer);
    return Customer;
}());
exports.Customer = Customer;
