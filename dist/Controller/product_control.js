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
var express_1 = __importDefault(require("express"));
var Product_entity_1 = require("../Entities/Product.entity");
var datasource_1 = __importDefault(require("../Datasource/datasource"));
var product_service_1 = __importDefault(require("../Services/product_service"));
var router3 = express_1.default.Router();
router3.get("/details", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var productrepo, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productrepo = datasource_1.default.getRepository(Product_entity_1.Product);
                    return [4 /*yield*/, product_service_1.default.getAllProducts()];
                case 1:
                    products = _a.sent();
                    res.json(products);
                    return [2 /*return*/];
            }
        });
    });
});
router3.get("/details/:productid", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var product_id, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    product_id = parseInt(req.params.productid);
                    return [4 /*yield*/, product_service_1.default.getProductById(product_id)];
                case 1:
                    product = _a.sent();
                    if (!product) {
                        res.status(404).send("product not found");
                    }
                    else {
                        res.json(product);
                    }
                    return [2 /*return*/];
            }
        });
    });
});
router3.post("/create", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, supplier_id, productName, unitPrice, packagename, isDiscontinued, orderItems, newProduct, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, supplier_id = _a.supplier_id, productName = _a.productName, unitPrice = _a.unitPrice, packagename = _a.packagename, isDiscontinued = _a.isDiscontinued, orderItems = _a.orderItems;
                    if (!supplier_id || !productName || !unitPrice || !packagename || isDiscontinued === undefined) {
                        return [2 /*return*/, res.status(400).json({ error: "Invalid product data in the request body." })];
                    }
                    return [4 /*yield*/, product_service_1.default.createProduct(supplier_id, productName, unitPrice, packagename, isDiscontinued, orderItems)];
                case 1:
                    newProduct = _b.sent();
                    res.status(201).json(newProduct);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    res.status(500).json({ error: error_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
router3.put("/update/:productid", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var product_id, updateProduct, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    product_id = parseInt(req.params.productid);
                    updateProduct = req.body;
                    if (!product_id || !updateProduct) {
                        return [2 /*return*/, res.status(400).json({ error: "Invalid input" })];
                    }
                    return [4 /*yield*/, product_service_1.default.updateProduct(product_id, updateProduct)];
                case 1:
                    _a.sent();
                    res.json({ message: "Product data updated successfully" });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).json({ error: error_2.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
router3.delete("/delete/:productid", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var product_id, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    product_id = parseInt(req.params.productid);
                    return [4 /*yield*/, product_service_1.default.deleteProduct(product_id)];
                case 1:
                    _a.sent();
                    res.json({ message: "Product deleted successfully" });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(500).json({ error: error_3.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.default = router3;
