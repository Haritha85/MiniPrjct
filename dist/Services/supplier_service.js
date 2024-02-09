"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var datasource_1 = __importDefault(require("../Datasource/datasource"));
var Product_entity_1 = require("../Entities/Product.entity");
var Supplier_entity_1 = require("../Entities/Supplier.entity");
var product_service_1 = __importDefault(require("./product_service"));
var customer_service_1 = __importDefault(require("./customer_service"));
var Customer_entity_1 = require("../Entities/Customer.entity");
var supplierService = /** @class */ (function () {
    function supplierService() {
        this.supplierrepo = datasource_1.default.getRepository(Supplier_entity_1.Supplier);
        this.productreppo = datasource_1.default.getRepository(Product_entity_1.Product);
    }
    supplierService.prototype.getAllSuppliers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.supplierrepo.find({
                            relations: ["products", "customers"]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    supplierService.prototype.getSupplierById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.supplierrepo.findOne({
                            where: { supplier_id: id },
                            relations: ["products", "customers"]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    supplierService.prototype.createSupplier = function (companyName, contactName, city, country, phone, products, customers) {
        return __awaiter(this, void 0, void 0, function () {
            var phoneRegex, existingSupplier, newSupplier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        phoneRegex = /^\d{10}$/;
                        if (!phoneRegex.test(phone)) {
                            throw new Error("Invalid phone number format. Phone number must contain 10 digits.");
                        }
                        return [4 /*yield*/, this.supplierrepo.findOne({ where: { companyName: companyName } })];
                    case 1:
                        existingSupplier = _a.sent();
                        if (existingSupplier) {
                            throw new Error("Supplier already exists");
                        }
                        newSupplier = new Supplier_entity_1.Supplier();
                        newSupplier.companyName = companyName;
                        newSupplier.contactName = contactName;
                        newSupplier.city = city;
                        newSupplier.country = country;
                        newSupplier.phone = phone;
                        if (products) {
                            newSupplier.products = products.map(function (productData) {
                                var product = new Product_entity_1.Product();
                                product.productName = productData.productName;
                                product.unitPrice = productData.unitPrice;
                                product.packagename = productData.packagename;
                                product.isDiscontinued = productData.isDiscontinued;
                                return product;
                            });
                        }
                        if (customers && customers.length > 0) {
                            newSupplier.customers = customers.map(function (customerData) {
                                var customer = new Customer_entity_1.Customer();
                                customer.firstName = customerData.firstName;
                                customer.lastName = customerData.lastName;
                                customer.city = customerData.city;
                                customer.country = customerData.country;
                                customer.phone = customerData.phone;
                                return customer;
                            });
                        }
                        return [2 /*return*/, this.supplierrepo.save(newSupplier)];
                }
            });
        });
    };
    supplierService.prototype.updateSupplier = function (supplier_id, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var existingSupplier, customers, products, supplierDetails, _i, customers_1, customer, customer_id, customerDetails, _a, products_1, product, product_id, productDetails;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!supplier_id) {
                            throw new Error("Supplier ID is required");
                        }
                        return [4 /*yield*/, this.supplierrepo.findOne({ where: { supplier_id: supplier_id } })];
                    case 1:
                        existingSupplier = _b.sent();
                        if (!existingSupplier) {
                            throw new Error("Supplier not found");
                        }
                        customers = updateData.customers, products = updateData.products, supplierDetails = __rest(updateData, ["customers", "products"]);
                        console.log("Updating the Supplier");
                        return [4 /*yield*/, this.supplierrepo.update(supplier_id, supplierDetails)];
                    case 2:
                        _b.sent();
                        if (!(customers && customers.length > 0)) return [3 /*break*/, 6];
                        _i = 0, customers_1 = customers;
                        _b.label = 3;
                    case 3:
                        if (!(_i < customers_1.length)) return [3 /*break*/, 6];
                        customer = customers_1[_i];
                        customer_id = customer.customer_id, customerDetails = __rest(customer, ["customer_id"]);
                        console.log("Updating customer with ID ".concat(customer_id));
                        return [4 /*yield*/, customer_service_1.default.updateCustomer(customer_id, customerDetails)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        if (!(products && products.length > 0)) return [3 /*break*/, 10];
                        _a = 0, products_1 = products;
                        _b.label = 7;
                    case 7:
                        if (!(_a < products_1.length)) return [3 /*break*/, 10];
                        product = products_1[_a];
                        product_id = product.product_id, productDetails = __rest(product, ["product_id"]);
                        console.log("Updating product with ID ".concat(product_id));
                        return [4 /*yield*/, product_service_1.default.updateProduct(product_id, productDetails)];
                    case 8: return [2 /*return*/, _b.sent()];
                    case 9:
                        _a++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    supplierService.prototype.deleteSupplier = function (supplier_id) {
        return __awaiter(this, void 0, void 0, function () {
            var supplier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.supplierrepo.findOne({ where: { supplier_id: supplier_id } })];
                    case 1:
                        supplier = _a.sent();
                        if (!supplier) {
                            throw new Error("Customer with ID ".concat(supplier_id, " not found"));
                        }
                        supplier.customers = [];
                        return [4 /*yield*/, this.supplierrepo.save(supplier)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.supplierrepo.remove(supplier)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return supplierService;
}());
exports.default = new supplierService;
