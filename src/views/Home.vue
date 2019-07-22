<template>
  <div class="home">
    <div class="columns">
      <div class="column is-9">
        <div class="text-reader">
          <TextReader :maxFiles="maxFiles" v-model="files"></TextReader>
        </div>
        <div class="tabs">
          <ul>
            <li class="" v-for="file in files" :key="file.name">
              <Sheet
                :legend="legend"
                :classes="classes"
                :filename="file.name"
                :text="file.text"
              ></Sheet>
            </li>
          </ul>
        </div>
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
import TextReader from '@/components/TextReader.vue';
import Sheet from '@/components/Sheet.vue';
import Legend from '@/components/Legend.vue';


const MAX_FILES = 5;
const LEGEND = {
  "O" : {name: "その他", example: "てにおは，部活動", shortcut: "O"},
  "ART": {name: "人工物", example: "アーティファクト，カイロスの時", shortcut: "A"},
  "EVT": {name: "イベント", example: "アジア通貨危機，台風3号", shortcut: "E"},
  "LOC": {name: "地名", example: "アメリカ，白巳津川市", shortcut: "L"},
  "ORG": {name: "組織名", example: "自民党，NHK", shortcut: "R"},
  "PSN-M": {name: "人名 (男)", example: "瓜生慎吾", shortcut: "M"},
  "PSN-W": {name: "人名 (女)", example: "天羽みう", shortcut: "W"},
  "PSN-X": {name: "人名 (その他)", example: "ぱんにゃ", shortcut: "X"},
  "TIM": {name: "時間", example: "午後三時，10:30", shortcut: "T"},
  "NUM": {name: "数値", example: "241円，3個，8割", shortcut: "N"},
};

@Component({
  components: {
    TextReader,
    Sheet,
    Legend,
  },
})
export default class Home extends Vue {
  private maxFiles: number = MAX_FILES;
  private files: any[] = [];
  private legend: object = LEGEND;
  private classes: string[] = Object.keys(LEGEND);
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

