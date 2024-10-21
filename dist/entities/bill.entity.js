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
exports.Bill = void 0;
const typeorm_1 = require("typeorm");
const consumerUnit_entity_1 = require("./consumerUnit.entity");
let Bill = class Bill {
};
exports.Bill = Bill;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Bill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => consumerUnit_entity_1.ConsumerUnit),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", consumerUnit_entity_1.ConsumerUnit)
], Bill.prototype, "consumer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Bill.prototype, "referenceMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Bill.prototype, "referenceYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: false }),
    __metadata("design:type", Date)
], Bill.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: false }),
    __metadata("design:type", String)
], Bill.prototype, "modality", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Bill.prototype, "distributor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    __metadata("design:type", String)
], Bill.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Bill.prototype, "consumptionEE", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Bill.prototype, "consumptionSCEE", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Bill.prototype, "compensatoryGDI", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", nullable: false }),
    __metadata("design:type", Number)
], Bill.prototype, "compensatoryValueGDI", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", nullable: false }),
    __metadata("design:type", Number)
], Bill.prototype, "publicContribuition", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", nullable: false }),
    __metadata("design:type", Number)
], Bill.prototype, "consumptionTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", nullable: false }),
    __metadata("design:type", Number)
], Bill.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", nullable: false }),
    __metadata("design:type", Number)
], Bill.prototype, "valueWithoutCompensatoryValue", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Bill.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Bill.prototype, "updatedAt", void 0);
exports.Bill = Bill = __decorate([
    (0, typeorm_1.Entity)("bill")
], Bill);
