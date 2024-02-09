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
exports.Product = void 0;
var typeorm_1 = require("typeorm");
var OrderItem_entity_1 = require("./OrderItem.entity");
var Supplier_entity_1 = require("./Supplier.entity");
var Product = /** @class */ (function () {
    function Product() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Product.prototype, "product_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Product.prototype, "productName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Product.prototype, "unitPrice", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Product.prototype, "packagename", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Product.prototype, "isDiscontinued", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return Supplier_entity_1.Supplier; }, function (supplier) { return supplier.products; }, { onDelete: "CASCADE" }),
        __metadata("design:type", Supplier_entity_1.Supplier)
    ], Product.prototype, "supplier", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return OrderItem_entity_1.OrderItem; }, function (orderItem) { return orderItem.product; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Product.prototype, "orderItems", void 0);
    Product = __decorate([
        (0, typeorm_1.Entity)()
    ], Product);
    return Product;
}());
exports.Product = Product;
