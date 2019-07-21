<template>
  <div class="home">
    <div class="columns">
      <div class="column is-9">
        <div class="text-reader">
          <TextReader @onTextRead="onTextRead"></TextReader>
        </div>
        <Editor :legend="legend" :text="text" :words="words" @onUpdate="onUpdate"></Editor>
        <TextSaver :filename="filename" :text="text" :words="words"></TextSaver>
      </div>
      <div class="column is-3">
        <div class="sidebar">
          <Legend :legend="legend"></Legend>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Editor from '@/components/Editor.vue'; // @ is an alias to /src
import TextReader from '@/components/TextReader.vue';
import TextSaver from '@/components/TextSaver.vue';
import Legend from '@/components/Legend.vue';


const LEGEND = {
  "O" : {name: "その他", example: "てにおは，部活動", shortcut: "1"},
  "ART": {name: "人工物", example: "アーティファクト，カイロスの時", shortcut: "A"},
  "EVT": {name: "イベント", example: "アジア通貨危機，台風3号", shortcut: "E"},
  "LOC": {name: "地名", example: "アメリカ，白巳津川市", shortcut: "L"},
  "ORG": {name: "組織名", example: "自民党，NHK", shortcut: "O"},
  "PSN-M": {name: "人名 (男)", example: "瓜生慎吾", shortcut: "M"},
  "PSN-W": {name: "人名 (女)", example: "天羽みう", shortcut: "W"},
  "PSN-X": {name: "人名 (その他)", example: "ぱんにゃ", shortcut: "X"},
  "TIM": {name: "時間", example: "午後三時，10:30", shortcut: "T"},
  "NUM": {name: "数値", example: "241円，3個，8割", shortcut: "N"},
};

@Component({
  components: {
    Editor,
    TextReader,
    TextSaver,
    Legend,
  },
})
export default class Home extends Vue {
  public filename: string | null = null;
  public text: string | null = null;
  public words: object[] = [];
  private legend: object = LEGEND;
  private classes: string[] = Object.keys(LEGEND);

  public onTextRead(filename: string, text: string) {
    this.filename = filename;
    this.text = text;
    this.words = this.textToWords(text);
  }

  public textToWords(text: string): object[] {
    if (!text) { return []; }

    const words: any[] = [];
    let id: number = 0;
    for (const line of text.split("\n")) {
      if (line === "EOS") break;
      const word = line.split("\t");
      let cls: string = word[2] || "O";
      if (cls !== "O" && !this.classes.includes(cls)) cls = "O";
      words.push({id: id++, word: word[0], cls, selected: false});
    }
    return words;
  }

  public onUpdate(id: number, attr: string, value: any) {
    const word: any = this.words[id];
    word[attr] = value;
  }
}
</script>

<style scoped>
  .sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: 80px;
  }

  .text-reader {
    margin-bottom: 20px;
  }
</style>

