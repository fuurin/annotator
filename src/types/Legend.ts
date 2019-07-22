export class Legend {
  constructor(
    public cls: string,
    public name: string,
    public example: string,
    public shortcut: string,
  ) {}
}

export const LEGEND: Legend[] = [
  new Legend("O", "その他", "てにおは，部活動", "O"),
  new Legend("ART", "人工物", "アーティファクト，カイロスの時計", "A"),
  new Legend("EVT", "イベント", "アジア通貨危機，台風3号", "E"),
  new Legend("LOC", "地名", "アメリカ，白巳津川市", "L"),
  new Legend("ORG", "組織名", "自民党，NHK", "R"),
  new Legend("PSN-M", "人名 (男)", "瓜生慎吾", "M"),
  new Legend("PSN-W", "人名 (女)", "天羽みう", "W"),
  new Legend("PSN-X", "人名 (その他)", "ぱんにゃ", "X"),
  new Legend("TIM", "時間", "午後三時，10:30", "T"),
  new Legend("NUM", "数値", "241円，3個，8割", "N"),
];

export const CLASSES: string[] = LEGEND.map((legend: Legend) => legend.cls);
