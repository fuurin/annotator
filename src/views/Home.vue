<template>
  <div class="home">
    <div class="columns">
      <div class="column is-9">
        <div class="text-reader">
          <TextReader @onTextRead="onTextRead"></TextReader>
        </div>
        <Editor :legend="legend" :text="inputText"></Editor>
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
  "O" : {name: "その他 (スペースキー)", example: "てにおは，部活動", shortcut: " "},
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
  public inputText: string | null = null;
  private legend: object = LEGEND;

  public onTextRead(text: string) {
    this.inputText = text;
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

