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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.tryCatch = tryCatch;
/**
 * Wraps an asynchronous operation and returns a Result object instead of throwing exceptions.
 *
 * This function provides type-safe error handling for async operations using the Result pattern.
 * It catches any thrown errors and returns them in a consistent format, optionally transforming
 * them to custom error classes with status codes.
 *
 * @template T - The type of data returned by the successful operation
 * @template E - The type of error returned, defaults to Error
 *
 * @param fnOrPromise - An async function or Promise to execute safely
 * @param options - Configuration options for error handling behavior
 *
 * @returns A Promise that resolves to a Result object containing either data or error
 *
 * @example
 * ## Basic Usage
 * ```typescript
 * const { data, error } = await tryCatch(fetchUserData());
 * if (error) {
 *   console.error('Operation failed:', error.message);
 *   return;
 * }
 * ```
 *
 * @example
 * ## With Async Function
 *
 * const { data, error } = await tryCatch(async () => {
 *   const user = await getUser();
 *   const profile = await getProfile(user.id);
 *   return { user, profile };
 * });
 *
 *
 * @example
 * ## With Custom Error Class and Status
 *
 * class ApiError extends Error {
 *   constructor(message: string, public status?: number) {
 *     super(message);
 *   }
 * }
 *
 * const { data, error } = await tryCatch(fetchApiData(), {
 *   ErrorClass: ApiError,
 *   defaultStatus: 500
 * });
 *
 * if (error) {
 *   error is typed as ApiError with status property
 *   console.log(`API Error ${error.status}: ${error.message}`);
 * }
 *
 *
 * @example
 * With Status Code Handling
 *
 * const { data, error } = await tryCatch(saveUserData(user), {
 *   defaultStatus: 400 // Use 400 Bad Request for validation errors
 * });
 *
 * if (error) {
 *   switch (error.status) {
 *     case 409:
 *       // Handle conflict error
 *       break;
 *     case 400:
 *       // Handle validation error
 *       break;
 *   }
 * }
 *
 *
 * @remarks
 * - If the operation succeeds: returns `{ data: T, error: null }`
 * - If the operation fails: returns `{ data: null, error: E }`
 * - Preserves the original error's status code if available
 * - Maintains error prototype chain for instanceof checks
 * - Converts non-Error thrown values to proper Error instances
 * - Supports both Promise objects and async functions
 *
 * @see {@link Result} for the return type structure
 * @see {@link TryCatchOptions} for configuration options
 * @see {@link ErrorWithStatus} for the default error type
 *
 */
function tryCatch(fn_1) {
    return __awaiter(this, arguments, void 0, function (fn, options) {
        var _a, ErrorClass, _b, defaultStatus, result, data, _c, error_1, message, cause, status_1, customError;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = options.ErrorClass, ErrorClass = _a === void 0 ? Error : _a, _b = options.defaultStatus, defaultStatus = _b === void 0 ? 500 : _b;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 5, , 6]);
                    result = fn();
                    if (!(result instanceof Promise)) return [3 /*break*/, 3];
                    return [4 /*yield*/, result];
                case 2:
                    _c = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _c = result;
                    _d.label = 4;
                case 4:
                    data = _c;
                    return [2 /*return*/, { data: data, error: null }];
                case 5:
                    error_1 = _d.sent();
                    if (error_1 instanceof ErrorClass) {
                        return [2 /*return*/, { data: null, error: error_1 }];
                    }
                    message = error_1 instanceof Error ? error_1.message : String(error_1);
                    cause = error_1 instanceof Error ? error_1.cause : undefined;
                    status_1 = (error_1 === null || error_1 === void 0 ? void 0 : error_1.status) || defaultStatus;
                    customError = new ErrorClass(message, status_1, cause);
                    return [2 /*return*/, { data: null, error: customError }];
                case 6: return [2 /*return*/];
            }
        });
    });
}
