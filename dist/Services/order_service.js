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
var Order_entity_1 = require("../Entities/Order.entity");
var Customer_entity_1 = require("../Entities/Customer.entity");
var OrderItem_entity_1 = require("../Entities/OrderItem.entity");
// import orderitem_service from "./orderitem_service";
var orderService = /** @class */ (function () {
    function orderService() {
        this.orderrepo = datasource_1.default.getRepository(Order_entity_1.Order);
        this.customerrepo = datasource_1.default.getRepository(Customer_entity_1.Customer);
        this.orderitemrepo = datasource_1.default.getRepository(OrderItem_entity_1.OrderItem);
    }
    orderService.prototype.getAllOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderrepo.find({
                            relations: ["customer", "orderItems"]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    orderService.prototype.getOrderById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderrepo.findOne({
                            where: { order_id: id },
                            relations: ["customer", "orderItems"]
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    orderService.prototype.createOrders = function (customer_id, Complted, orderItem) {
        return __awaiter(this, void 0, void 0, function () {
            var customer, order, createdOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.customerrepo.findOne({ where: { customer_id: customer_id } })];
                    case 1:
                        customer = _a.sent();
                        if (!customer) {
                            throw new Error("Customer not found");
                        }
                        console.log("Creating new order");
                        order = new Order_entity_1.Order();
                        order.orderDate = new Date();
                        order.totalAmount = 0;
                        order.Complted = Complted;
                        order.customer = customer;
                        if (orderItem) {
                            order.orderItems = orderItem.map(function (orderItemData) {
                                var newOrderItem = new OrderItem_entity_1.OrderItem();
                                newOrderItem.quantity = orderItemData.quantity;
                                newOrderItem.unitPrice = orderItemData.unitPrice;
                                order.totalAmount += newOrderItem.quantity * newOrderItem.unitPrice;
                                return newOrderItem;
                            });
                        }
                        return [4 /*yield*/, this.orderrepo.save(order)];
                    case 2:
                        createdOrder = _a.sent();
                        console.log(createdOrder);
                        return [2 /*return*/, createdOrder];
                }
            });
        });
    };
    orderService.prototype.addOrderitemsByIdtoorder = function (customerid, Complted, orderItemIds) {
        return __awaiter(this, void 0, void 0, function () {
            var existingCustomer, order, orderItems, createdOrder;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.customerrepo.findOne({
                            where: { customer_id: customerid }
                        })];
                    case 1:
                        existingCustomer = _a.sent();
                        if (!existingCustomer) {
                            throw new Error("Customer not found");
                        }
                        order = new Order_entity_1.Order();
                        order.orderDate = new Date();
                        order.totalAmount = 0;
                        order.Complted = Complted;
                        order.customer = existingCustomer;
                        if (!orderItemIds) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.all(orderItemIds.map(function (orderItemId) { return __awaiter(_this, void 0, void 0, function () {
                                var existingOrderItem;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.orderitemrepo.findOne({ where: { orderItem_id: orderItemId } })];
                                        case 1:
                                            existingOrderItem = _a.sent();
                                            if (!existingOrderItem) {
                                                throw new Error("OrderItem with ID ".concat(orderItemId, " not found"));
                                            }
                                            return [2 /*return*/, existingOrderItem];
                                    }
                                });
                            }); }))];
                    case 2:
                        orderItems = _a.sent();
                        console.log("orderItems:", orderItems);
                        orderItems.forEach(function (item) {
                            order.totalAmount += item.quantity * item.unitPrice;
                        });
                        order.orderItems = orderItems;
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.orderrepo.save(order)];
                    case 4:
                        createdOrder = _a.sent();
                        console.log(createdOrder);
                        return [2 /*return*/, createdOrder];
                }
            });
        });
    };
    orderService.prototype.updateOrder = function (orderId, updateOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var existingOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderrepo.findOne({
                            where: { order_id: orderId }
                        })];
                    case 1:
                        existingOrder = _a.sent();
                        if (!existingOrder) {
                            throw new Error("Order not found");
                        }
                        console.log("Updating the order");
                        return [4 /*yield*/, this.orderrepo.update(orderId, updateOrder)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    orderService.prototype.deleteorder = function (order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderrepo.findOne({
                            where: { order_id: order_id },
                            //relations:["orders"]
                        })];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            throw new Error("order with ID ${order} not found");
                        }
                        order.orderItems = [];
                        return [4 /*yield*/, this.orderrepo.save(order)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.orderrepo.remove(order)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return orderService;
}());
exports.default = new orderService;
