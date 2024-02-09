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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration81706604626989 = void 0;
var Migration81706604626989 = /** @class */ (function () {
    function Migration81706604626989() {
        this.name = 'Migration81706604626989';
    }
    Migration81706604626989.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"customer_suppliers_supplier\" (\"customerCustomerId\" int NOT NULL, \"supplierSupplierId\" int NOT NULL, CONSTRAINT \"PK_217c577232b1518f2b6ae7a3c86\" PRIMARY KEY (\"customerCustomerId\", \"supplierSupplierId\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_0030e6d29cb983391cac6d26a2\" ON \"customer_suppliers_supplier\" (\"customerCustomerId\") ")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_9aee0f5f3561c76c38fc24f384\" ON \"customer_suppliers_supplier\" (\"supplierSupplierId\") ")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"supplier_customers_customer\" (\"supplierSupplierId\" int NOT NULL, \"customerCustomerId\" int NOT NULL, CONSTRAINT \"PK_65842d909fd3daf468ebf7a8fd8\" PRIMARY KEY (\"supplierSupplierId\", \"customerCustomerId\"))")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_923b9558c1901de1e87bb771bc\" ON \"supplier_customers_customer\" (\"supplierSupplierId\") ")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_84bc882688918a284e6cd7d9aa\" ON \"supplier_customers_customer\" (\"customerCustomerId\") ")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"customer_suppliers_supplier\" ADD CONSTRAINT \"FK_0030e6d29cb983391cac6d26a2e\" FOREIGN KEY (\"customerCustomerId\") REFERENCES \"customer\"(\"customer_id\") ON DELETE CASCADE ON UPDATE CASCADE")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"customer_suppliers_supplier\" ADD CONSTRAINT \"FK_9aee0f5f3561c76c38fc24f3844\" FOREIGN KEY (\"supplierSupplierId\") REFERENCES \"supplier\"(\"supplier_id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"supplier_customers_customer\" ADD CONSTRAINT \"FK_923b9558c1901de1e87bb771bc2\" FOREIGN KEY (\"supplierSupplierId\") REFERENCES \"supplier\"(\"supplier_id\") ON DELETE CASCADE ON UPDATE CASCADE")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"supplier_customers_customer\" ADD CONSTRAINT \"FK_84bc882688918a284e6cd7d9aac\" FOREIGN KEY (\"customerCustomerId\") REFERENCES \"customer\"(\"customer_id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 10:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Migration81706604626989.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"supplier_customers_customer\" DROP CONSTRAINT \"FK_84bc882688918a284e6cd7d9aac\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"supplier_customers_customer\" DROP CONSTRAINT \"FK_923b9558c1901de1e87bb771bc2\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"customer_suppliers_supplier\" DROP CONSTRAINT \"FK_9aee0f5f3561c76c38fc24f3844\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"customer_suppliers_supplier\" DROP CONSTRAINT \"FK_0030e6d29cb983391cac6d26a2e\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"IDX_84bc882688918a284e6cd7d9aa\" ON \"supplier_customers_customer\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"IDX_923b9558c1901de1e87bb771bc\" ON \"supplier_customers_customer\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"supplier_customers_customer\"")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"IDX_9aee0f5f3561c76c38fc24f384\" ON \"customer_suppliers_supplier\"")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"IDX_0030e6d29cb983391cac6d26a2\" ON \"customer_suppliers_supplier\"")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"customer_suppliers_supplier\"")];
                    case 10:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Migration81706604626989;
}());
exports.Migration81706604626989 = Migration81706604626989;
