<template>
  <div class="home">
    <div class="columns">
      <div class="column is-9">
        <div class="section">
          <TextReader @onTextRead="onTextRead"></TextReader>
        </div>
        <Editor :text="inputText" :legend="legend"></Editor>
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


const LEGEND = [
  {cls: "O", name: "その他 (スペースキー)", example: "てにおは，部活動", shortcut: " "},
  {cls: "ART", name: "固有物名", example: "ノーベル文学賞，Windows7", shortcut: "A"},
  {cls: "LOC", name: "地名", example: "アメリカ，千葉県", shortcut: "L"},
  {cls: "ORG", name: "組織名", example: "自民党，NHK", shortcut: "O"},
  {cls: "PSN-M", name: "人名 (男)", example: "瓜生慎吾", shortcut: "M"},
  {cls: "PSN-W", name: "人名 (女)", example: "天羽みう", shortcut: "W"},
  {cls: "PSN-X", name: "人名 (その他)", example: "ぱんにゃ", shortcut: "X"},
  {cls: "DAT", name: "日付", example: "1月29日，2016/01/29", shortcut: "D"},
  {cls: "TIM", name: "時間", example: "午後三時，10:30", shortcut: "T"},
  {cls: "MNY", name: "金額", example: "241円，8ドル", shortcut: "Y"}, // Yen
  {cls: "PNT", name: "割合", example: "10%，3割", shortcut: "P"},
];

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
  private legend: object[] = LEGEND;

  public onTextRead(text: string) {
    this.inputText = text;
  }
}
</script>

<style scoped>
  .sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: 110px;
  }
</style>

