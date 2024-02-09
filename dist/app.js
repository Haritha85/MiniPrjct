"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var customer_control_1 = __importDefault(require("./Controller/customer_control"));
var datasource_1 = __importDefault(require("./Datasource/datasource"));
var custinfo_control_1 = __importDefault(require("./Controller/custinfo_control"));
var order_control_1 = __importDefault(require("./Controller/order_control"));
var product_control_1 = __importDefault(require("./Controller/product_control"));
var orderitem_control_1 = __importDefault(require("./Controller/orderitem_control"));
var supplier_control_1 = __importDefault(require("./Controller/supplier_control"));
var additionalfeatures_control_1 = __importDefault(require("./Controller/additionalfeatures_control"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/customer', customer_control_1.default);
app.use('/custinfo', custinfo_control_1.default);
app.use('/order', order_control_1.default);
app.use('/product', product_control_1.default);
app.use('/orderitem', orderitem_control_1.default);
app.use('/supplier', supplier_control_1.default);
app.use('/additional', additionalfeatures_control_1.default);
datasource_1.default.initialize()
    .then(function () {
    console.log("connected");
})
    .catch(function (err) { return console.log("error while connecting", err); });
app.listen(3000, function () {
    console.log("running");
});
