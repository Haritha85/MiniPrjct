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
var datasource_1 = __importDefault(require("../Datasource/datasource"));
var supplier_service_1 = __importDefault(require("../Services/supplier_service"));
var Supplier_entity_1 = require("../Entities/Supplier.entity");
var router5 = express_1.default.Router();
router5.get("/details", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var supplierrepo, suppliers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    supplierrepo = datasource_1.default.getRepository(Supplier_entity_1.Supplier);
                    return [4 /*yield*/, supplier_service_1.default.getAllSuppliers()];
                case 1:
                    suppliers = _a.sent();
                    res.json(suppliers);
                    return [2 /*return*/];
            }
        });
    });
});
router5.get("/getOne/:supplierid", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var supplier_id, supplier, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    supplier_id = parseInt(req.params.supplierid);
                    return [4 /*yield*/, supplier_service_1.default.getSupplierById(supplier_id)];
                case 1:
                    supplier = _a.sent();
                    if (!supplier) {
                        res.status(404).send("Supplier not found");
                    }
                    else {
                        res.json(supplier);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        res.status(500).json({ error: error_1.message });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
router5.post("/create", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, customers, companyName, contactName, city, country, phone, products, newSupplier, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, customers = _a.customers, companyName = _a.companyName, contactName = _a.contactName, city = _a.city, country = _a.country, phone = _a.phone, products = _a.products;
                    if (!companyName || !contactName || !city || !country || !phone) {
                        throw new Error("Incomplete data!");
                    }
                    return [4 /*yield*/, supplier_service_1.default.createSupplier(companyName, contactName, city, country, phone, products, customers)];
                case 1:
                    newSupplier = _b.sent();
                    res.json(newSupplier);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    if (error_2 instanceof Error) {
                        return [2 /*return*/, res.status(500).json({ error: error_2.message })];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
router5.put("/update/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, updatedata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id);
                    updatedata = req.body;
                    if (!id || !updatedata) {
                        return [2 /*return*/, res.status(400).json({ error: "invalid input" })];
                    }
                    return [4 /*yield*/, supplier_service_1.default.updateSupplier(id, updatedata)];
                case 1:
                    _a.sent();
                    res.json({ message: "Supplier data updated successfully" });
                    return [2 /*return*/];
            }
        });
    });
});
router5.delete("/delete/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var supplierid, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    supplierid = parseInt(req.params.id);
                    return [4 /*yield*/, supplier_service_1.default.deleteSupplier(supplierid)];
                case 1:
                    _a.sent();
                    res.json({ message: "Supplier deleted successfully" });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    if (error_3 instanceof Error) {
                        return [2 /*return*/, res.status(500).json({ error: error_3.message })];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.default = router5;
