"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        min: 2,
        max: 15,
        required: true,
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
        required: [true, "User email required"],
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return validator.isMobilePhone(v, "ar-EG");
            },
            message: (props) => `${props.value} is not a valid phone!`,
        },
        required: [true, "User phone required"],
    },
    password: {
        type: String,
        required: [true, "User password required"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.model("User", UserSchema);
