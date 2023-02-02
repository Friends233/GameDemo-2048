/** 游戏舞台矩阵 */
const MAX_W = 4
const MAX_H = 4
/** 卡片配置 */
const CARD_CONFIG = {
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
}
/** 卡片类型 */
const CARD_TYPE = {
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
}

/** 获取二位数组随机值 */
function getRandNum(i, j) {
  const randomNum = Math.ceil(Math.random() * (i * j - 1))
  let x = 0, y = 0
  if (randomNum <= i) {
    x = randomNum
    y = 0
  } else {
    x = randomNum % i
    y = Math.floor(randomNum / i)
  }
  return { x, y }
}


class Main extends egret.DisplayObjectContainer {

  /** 游戏卡片管理器 */
  private CardMannager: GameCardMannager = null

  public constructor() {
    super();
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }

  private onAddToStage(event: egret.Event) {

    egret.lifecycle.addLifecycleListener((context) => {
      // custom lifecycle plugin

      context.onUpdate = () => {

      }
    })

    egret.lifecycle.onPause = () => {
      egret.ticker.pause();
    }

    egret.lifecycle.onResume = () => {
      egret.ticker.resume();
    }

    this.runGame().catch(e => {
      console.log(e);
    })



  }

  private async runGame() {
    await this.loadResource()
    this.createGameScene();
    const result = await RES.getResAsync("description_json")
    // this.startAnimation(result);
    // await platform.login();
    // const userInfo = await platform.getUserInfo();
    // console.log(userInfo);

  }

  private async loadResource() {
    try {
      const loadingView = new LoadingUI();
      this.stage.addChild(loadingView);
      await RES.loadConfig("resource/default.res.json", "resource/");
      await RES.loadGroup("preload", 0, loadingView);
      this.stage.removeChild(loadingView);
    }
    catch (e) {
      console.error(e);
    }
  }

  private textfield: egret.TextField;

  /**
   * 创建游戏场景
   * Create a game scene
   */
  private createGameScene() {
    this.CardMannager = new GameCardMannager(this)
  }

  /**
   * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
   * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
   */
  private createBitmapByName(name: string) {
    let result = new egret.Bitmap();
    let texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result;
  }

  /**
   * 描述文件加载成功，开始播放动画
   * Description file loading is successful, start to play the animation
   */
  private startAnimation(result: string[]) {
    let parser = new egret.HtmlTextParser();

    let textflowArr = result.map(text => parser.parse(text));
    let textfield = this.textfield;
    let count = -1;
    let change = () => {
      count++;
      if (count >= textflowArr.length) {
        count = 0;
      }
      let textFlow = textflowArr[count];

      // 切换描述内容
      // Switch to described content
      textfield.textFlow = textFlow;
      let tw = egret.Tween.get(textfield);
      tw.to({ "alpha": 1 }, 200);
      tw.wait(2000);
      tw.to({ "alpha": 0 }, 200);
      tw.call(change, this);
    };

    change();
  }
}

class GameCardMannager {
  /** 卡片池 */
  public cardPool: GameCard[][] = []

  /** 游戏舞台 */
  private stage: egret.Stage = null

  private posX = 0

  private posY = 0

  public constructor(stage) {
    this.stage = stage

    this._init()
  }

  /** 初始化卡片池，渲染棋盘，生成卡片 */
  private _init() {
    let key = 0
    const posX = this.posX = (750 - (CARD_CONFIG.CARD_W + CARD_CONFIG.CARD_OFFSET) * MAX_W) / 2 + CARD_CONFIG.CARD_OFFSET
    const posY = this.posY = (1338 - (CARD_CONFIG.CARD_H + CARD_CONFIG.CARD_OFFSET) * MAX_H) / 2 + CARD_CONFIG.CARD_OFFSET
    for (let i = 0; i < MAX_H; i++) {
      this.cardPool.push([])
    }
    this._renderCardCb(posX, posY)
    this.randomCreate(CARD_CONFIG.CARD_RAND_NUM)
  }

  /**
   * 渲染游戏棋盘
   * @param posX 偏移x
   * @param posY 偏移y
   */
  private _renderCardCb(posX, posY) {
    for (let i = 0; i < MAX_W; i++) {
      for (let j = 0; j < MAX_H; j++) {
        const card = new GameCard(-1)
        card.$setX(i * (CARD_CONFIG.CARD_W + CARD_CONFIG.CARD_OFFSET) + posX)
        card.$setY(j * (CARD_CONFIG.CARD_H + CARD_CONFIG.CARD_OFFSET) + posY)
        this.stage.addChild(card)
      }
    }
  }

  /**
   * 随机生成卡片
   * @param num 生成卡片数量
   */
  public randomCreate(num) {
    for (let i = 0; i < num; i++) {
      const { x, y } = getRandNum(MAX_W, MAX_H)
      if (!this.cardPool[x]) {
        this.cardPool[x] = []
      }
      const card = new GameCard(Date.now(), CARD_TYPE[2])
      card.$setX(x * (CARD_CONFIG.CARD_W + CARD_CONFIG.CARD_OFFSET) + this.posX)
      card.$setY(y * (CARD_CONFIG.CARD_H + CARD_CONFIG.CARD_OFFSET) + this.posY)
      this.cardPool[x][y] = card
      this.stage.addChild(card)
    }
    console.log(this.cardPool)
  }
}

class GameCard extends egret.DisplayObjectContainer {
  /** 唯一的CardKey */
  public key = null
  /** 卡片类型 */
  public cardType = CARD_TYPE[0]
  /** 得分 */
  public score = 0
  /** 颜色 */
  private color = CARD_CONFIG[0].color
  /** 卡片shape */
  private shape: egret.Shape = null
  /** 文案 */
  private lable: egret.TextField = null

  public constructor(key, type = CARD_TYPE[0]) {
    super();
    this.key = key
    this._init(type)
  }

  private _init(type) {
    this.setCardType(type)
  }

  /**
   * 设置卡片类型
   * @param {CARD_TYPE} type 卡片类型
   */
  public setCardType(type) {
    this.cardType = type
    this.createCard()
    this.addLabel()
  }

  /** 创建卡片 */
  private createCard() {
    if (this.shape) {
      this.removeChild(this.shape)
    }
    console.log('创建', this.cardType)
    const Shape = this.shape = new egret.Shape()
    Shape.graphics.beginFill(CARD_CONFIG[this.cardType].color)
    Shape.graphics.drawRoundRect(0, 0, CARD_CONFIG.CARD_W, CARD_CONFIG.CARD_H, 30, 30)
    Shape.graphics.endFill()
    Shape.x = 0
    Shape.y = 0
    this.addChild(Shape)
  }

  private addLabel() {
    if (this.lable) {
      this.removeChild(this.lable)
    }
    /*** 本示例关键代码段开始 ***/
    const label: egret.TextField = this.lable = new egret.TextField();
    label.text = this.cardType
    //设置颜色等文本属性
    label.textColor = 0xffffff
    label.size = 56
    label.bold = true
    label.x = (CARD_CONFIG.CARD_W - label.width) / 2
    label.y = (CARD_CONFIG.CARD_H - label.height) / 2

    this.addChild(label);
  }
} 