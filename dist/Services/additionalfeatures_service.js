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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var datasource_1 = __importDefault(require("../Datasource/datasource"));
var Customer_entity_1 = require("../Entities/Customer.entity");
var Order_entity_1 = require("../Entities/Order.entity");
var Product_entity_1 = require("../Entities/Product.entity");
var orderitem_service_1 = __importDefault(require("../Services/orderitem_service"));
var order_service_1 = __importDefault(require("../Services/order_service"));
var addfeatures = /** @class */ (function () {
    function addfeatures() {
        this.customerrepo = datasource_1.default.getRepository(Customer_entity_1.Customer);
        this.orderrepo = datasource_1.default.getRepository(Order_entity_1.Order);
        this.productrepo = datasource_1.default.getRepository(Product_entity_1.Product);
    }
    addfeatures.prototype.getActiveOrdersForCustomer = function (customer_id) {
        return __awaiter(this, void 0, void 0, function () {
            var activeOrders, activeOrdercount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderrepo.find({
                            where: {
                                customer: { customer_id: customer_id },
                                Complted: false,
                            },
                            relations: ["orderItems"]
                        })];
                    case 1:
                        activeOrders = _a.sent();
                        activeOrdercount = activeOrders.length;
                        return [2 /*return*/, { activeOrdercount: activeOrdercount, activeOrders: activeOrders }];
                }
            });
        });
    };
    addfeatures.prototype.getNumberOfOrders = function (customer_id) {
        return __awaiter(this, void 0, void 0, function () {
            var customer, numberOfOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(customer_id);
                        return [4 /*yield*/, this.customerrepo.findOne({
                                where: { customer_id: customer_id },
                                relations: ["orders"],
                            })];
                    case 1:
                        customer = _a.sent();
                        if (!customer) {
                            throw new Error("Customer with ID ".concat(customer_id, " not found"));
                        }
                        console.log("hii");
                        numberOfOrders = customer.orders.length;
                        console.log("Number of orders for customer ".concat(customer_id, ": ").concat(numberOfOrders));
                        return [2 /*return*/, numberOfOrders];
                }
            });
        });
    };
    addfeatures.prototype.creatingOrders = function (customer_id, Complted, products) {
        return __awaiter(this, void 0, void 0, function () {
            var customer, orderItemsData, index, productName, quantity, product, product_id, createdOrderItem, createdOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.customerrepo.findOne({ where: { customer_id: customer_id } })];
                    case 1:
                        customer = _a.sent();
                        if (!customer) {
                            throw new Error("Customer with ID ".concat(customer_id, " not found"));
                        }
                        console.log(customer);
                        orderItemsData = [];
                        console.log(products);
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < products.length)) return [3 /*break*/, 6];
                        productName = products[index].productName;
                        quantity = products[index].quantity;
                        return [4 /*yield*/, this.productrepo.findOne({ where: { productName: productName } })];
                    case 3:
                        product = _a.sent();
                        console.log(product);
                        if (!product) {
                            throw new Error("Product with name ".concat(productName, " not found"));
                        }
                        product_id = product.product_id;
                        console.log("ProductId is ".concat(product_id));
                        return [4 /*yield*/, orderitem_service_1.default.createOrderItem(quantity, product_id)];
                    case 4:
                        createdOrderItem = _a.sent();
                        console.log(createdOrderItem);
                        orderItemsData.push(createdOrderItem);
                        _a.label = 5;
                    case 5:
                        index++;
                        return [3 /*break*/, 2];
                    case 6:
                        console.log(orderItemsData);
                        return [4 /*yield*/, order_service_1.default.createOrders(customer_id, Complted, orderItemsData)];
                    case 7:
                        createdOrder = _a.sent();
                        console.log(createdOrder);
                        return [2 /*return*/, createdOrder];
                }
            });
        });
    };
    return addfeatures;
}());
exports.default = new addfeatures;
