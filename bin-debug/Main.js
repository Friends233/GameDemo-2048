var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
/** 游戏舞台矩阵 */
var MAX_W = 4;
var MAX_H = 4;
/** 卡片配置 */
var CARD_CONFIG = {
    /** 卡片宽 */
    CARD_W: 100,
    /** 卡片高 */
    CARD_H: 100,
    /** 卡片渲染间隔 */
    CARD_OFFSET: 15,
    /** 生成初始得分卡片的数量 */
    CARD_RAND_NUM: 2,
    '4096': {
        /** 卡片颜色 */
        color: 0xFDFDA6,
        /** 卡片得分 */
        score: 40
    },
    '2048': {
        /** 卡片颜色 */
        color: 0x000000,
        /** 卡片得分 */
        score: 40
    },
    '1024': {
        /** 卡片颜色 */
        color: 0xff0000,
        /** 卡片得分 */
        score: 35
    },
    '512': {
        /** 卡片颜色 */
        color: 0xff80c0,
        /** 卡片得分 */
        score: 25
    },
    '256': {
        /** 卡片颜色 */
        color: 0x5ff3e1,
        /** 卡片得分 */
        score: 20
    },
    '128': {
        /** 卡片颜色 */
        color: 0x008080,
        /** 卡片得分 */
        score: 15
    },
    '64': {
        /** 卡片颜色 */
        color: 0x8000ff,
        /** 卡片得分 */
        score: 10
    },
    '32': {
        /** 卡片颜色 */
        color: 0xfa00df,
        /** 卡片得分 */
        score: 8
    },
    '16': {
        /** 卡片颜色 */
        color: 0x804040,
        /** 卡片得分 */
        score: 6
    },
    '8': {
        /** 卡片颜色 */
        color: 0xFDDCBD,
        /** 卡片得分 */
        score: 4
    },
    '4': {
        /** 卡片颜色 */
        color: 0x0080ff,
        /** 卡片得分 */
        score: 2
    },
    '2': {
        /** 卡片颜色 */
        color: 0xef9559,
        /** 卡片得分 */
        score: 1
    },
    '0': {
        /** 卡片颜色 */
        color: 0xbb997c,
        /** 卡片得分 */
        score: 0
    },
};
/** 卡片类型 */
var CARD_TYPE = {
    '4096': '4096',
    '2048': '2048',
    '1024': '1024',
    '512': '512',
    '256': '256',
    '128': '128',
    '64': '64',
    '32': '32',
    '16': '16',
    '8': '8',
    '4': '4',
    '2': '2',
    '0': '0',
};
/** 获取二位数组随机值 */
function getRandNum(i, j) {
    var randomNum = Math.ceil(Math.random() * (i * j - 1));
    var x = 0, y = 0;
    if (randomNum <= i) {
        x = randomNum;
        y = 0;
    }
    else {
        x = randomNum % i;
        y = Math.floor(randomNum / i);
    }
    return { x: x, y: y };
}
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        /** 游戏卡片管理器 */
        _this.CardMannager = null;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")
                            // this.startAnimation(result);
                            // await platform.login();
                            // const userInfo = await platform.getUserInfo();
                            // console.log(userInfo);
                        ];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        this.CardMannager = new GameCardMannager(this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var GameCardMannager = (function () {
    function GameCardMannager(stage) {
        /** 卡片池 */
        this.cardPool = [];
        /** 游戏舞台 */
        this.stage = null;
        this.posX = 0;
        this.posY = 0;
        this.stage = stage;
        this._init();
    }
    /** 初始化卡片池，渲染棋盘，生成卡片 */
    GameCardMannager.prototype._init = function () {
        var key = 0;
        var posX = this.posX = (750 - (CARD_CONFIG.CARD_W + CARD_CONFIG.CARD_OFFSET) * MAX_W) / 2 + CARD_CONFIG.CARD_OFFSET;
        var posY = this.posY = (1338 - (CARD_CONFIG.CARD_H + CARD_CONFIG.CARD_OFFSET) * MAX_H) / 2 + CARD_CONFIG.CARD_OFFSET;
        for (var i = 0; i < MAX_H; i++) {
            this.cardPool.push([]);
        }
        this._renderCardCb(posX, posY);
        this.randomCreate(CARD_CONFIG.CARD_RAND_NUM);
    };
    /**
     * 渲染游戏棋盘
     * @param posX 偏移x
     * @param posY 偏移y
     */
    GameCardMannager.prototype._renderCardCb = function (posX, posY) {
        for (var i = 0; i < MAX_W; i++) {
            for (var j = 0; j < MAX_H; j++) {
                var card = new GameCard(-1);
                card.$setX(i * (CARD_CONFIG.CARD_W + CARD_CONFIG.CARD_OFFSET) + posX);
                card.$setY(j * (CARD_CONFIG.CARD_H + CARD_CONFIG.CARD_OFFSET) + posY);
                this.stage.addChild(card);
            }
        }
    };
    /**
     * 随机生成卡片
     * @param num 生成卡片数量
     */
    GameCardMannager.prototype.randomCreate = function (num) {
        for (var i = 0; i < num; i++) {
            var _a = getRandNum(MAX_W, MAX_H), x = _a.x, y = _a.y;
            if (!this.cardPool[x]) {
                this.cardPool[x] = [];
            }
            var card = new GameCard(Date.now(), CARD_TYPE[2]);
            card.$setX(x * (CARD_CONFIG.CARD_W + CARD_CONFIG.CARD_OFFSET) + this.posX);
            card.$setY(y * (CARD_CONFIG.CARD_H + CARD_CONFIG.CARD_OFFSET) + this.posY);
            this.cardPool[x][y] = card;
            this.stage.addChild(card);
        }
        console.log(this.cardPool);
    };
    return GameCardMannager;
}());
__reflect(GameCardMannager.prototype, "GameCardMannager");
var GameCard = (function (_super) {
    __extends(GameCard, _super);
    function GameCard(key, type) {
        if (type === void 0) { type = CARD_TYPE[0]; }
        var _this = _super.call(this) || this;
        /** 唯一的CardKey */
        _this.key = null;
        /** 卡片类型 */
        _this.cardType = CARD_TYPE[0];
        /** 得分 */
        _this.score = 0;
        /** 颜色 */
        _this.color = CARD_CONFIG[0].color;
        /** 卡片shape */
        _this.shape = null;
        /** 文案 */
        _this.lable = null;
        _this.key = key;
        _this._init(type);
        return _this;
    }
    GameCard.prototype._init = function (type) {
        this.setCardType(type);
    };
    /**
     * 设置卡片类型
     * @param {CARD_TYPE} type 卡片类型
     */
    GameCard.prototype.setCardType = function (type) {
        this.cardType = type;
        this.createCard();
        this.addLabel();
    };
    /** 创建卡片 */
    GameCard.prototype.createCard = function () {
        if (this.shape) {
            this.removeChild(this.shape);
        }
        console.log('创建', this.cardType);
        var Shape = this.shape = new egret.Shape();
        Shape.graphics.beginFill(CARD_CONFIG[this.cardType].color);
        Shape.graphics.drawRoundRect(0, 0, CARD_CONFIG.CARD_W, CARD_CONFIG.CARD_H, 30, 30);
        Shape.graphics.endFill();
        Shape.x = 0;
        Shape.y = 0;
        this.addChild(Shape);
    };
    GameCard.prototype.addLabel = function () {
        if (this.lable) {
            this.removeChild(this.lable);
        }
        /*** 本示例关键代码段开始 ***/
        var label = this.lable = new egret.TextField();
        label.text = this.cardType;
        //设置颜色等文本属性
        label.textColor = 0xffffff;
        label.size = 56;
        label.bold = true;
        label.x = (CARD_CONFIG.CARD_W - label.width) / 2;
        label.y = (CARD_CONFIG.CARD_H - label.height) / 2;
        this.addChild(label);
    };
    return GameCard;
}(egret.DisplayObjectContainer));
__reflect(GameCard.prototype, "GameCard");
