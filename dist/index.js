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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TOKEN || '';
// define a route handler for the default home page
app.get("/twits/:username/:count", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const count = req.params.count;
    let tweets = [];
    let response;
    try {
        response = yield node_fetch_1.default(`https://api.twitter.com/1.1/statuses/user_timeline.json?tweet_mode=extended&include_rts=false&exclude_replies=true&screen_name=${username}&count=${count}`, { headers: { 'Authorization': `Bearer ${TOKEN}` } });
        const json = yield response.json();
        tweets = json.map(tweet => tweet.full_text);
    }
    catch (e) {
        // tslint:disable-next-line: no-console
        console.log(e);
        const erroResult = {
            success: false,
            body: [''],
        };
        res.status(400).json(erroResult);
    }
    const result = {
        success: true,
        body: tweets,
    };
    res.status(200).json(result);
}));
// start the Express server
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map