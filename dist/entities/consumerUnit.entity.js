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
exports.ConsumerUnit = void 0;
const typeorm_1 = require("typeorm");
const bill_entity_1 = require("./bill.entity");
let ConsumerUnit = class ConsumerUnit {
};
exports.ConsumerUnit = ConsumerUnit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ConsumerUnit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], ConsumerUnit.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: false }),
    __metadata("design:type", Number)
], ConsumerUnit.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ConsumerUnit.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], ConsumerUnit.prototype, "distributor", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ConsumerUnit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ConsumerUnit.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bill_entity_1.Bill, (bills) => bills.consumer),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], ConsumerUnit.prototype, "bills", void 0);
exports.ConsumerUnit = ConsumerUnit = __decorate([
    (0, typeorm_1.Entity)("consumerUnit")
], ConsumerUnit);
