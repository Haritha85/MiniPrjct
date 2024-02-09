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
exports.Supplier = void 0;
var typeorm_1 = require("typeorm");
var Product_entity_1 = require("./Product.entity");
var Customer_entity_1 = require("./Customer.entity");
var Supplier = /** @class */ (function () {
    function Supplier() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Supplier.prototype, "supplier_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Supplier.prototype, "companyName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Supplier.prototype, "contactName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Supplier.prototype, "city", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Supplier.prototype, "country", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Supplier.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Product_entity_1.Product; }, function (product) { return product.supplier; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Supplier.prototype, "products", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Customer_entity_1.Customer; }, function (customer) { return customer.supplier; }, { cascade: true }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], Supplier.prototype, "customers", void 0);
    Supplier = __decorate([
        (0, typeorm_1.Entity)()
    ], Supplier);
    return Supplier;
}());
exports.Supplier = Supplier;
