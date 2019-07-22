<template>
  <div class="home">
    <div class="columns">
      <div class="column is-9">
        <div class="text-reader">
          <TextReader @onTextRead="textRead"></TextReader>
        </div>
        <TextEditor :words="words"></TextEditor>
        <TextSaver :filename="filename" :text="text" :words="words"></TextSaver>
      </div>
      <div class="column is-3">
        <div class="sidebar">
          <LegendTable></LegendTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CLASSES } from '@/types/Legend.ts';
import { Word } from '@/types/Word.ts';
import TextReader from '@/components/TextReader.vue';
import TextEditor from '@/components/TextEditor.vue';
import TextSaver from '@/components/TextSaver.vue';
import LegendTable from '@/components/LegendTable.vue';

@Component({
  components: {
    TextReader,
    TextEditor,
    TextSaver,
    LegendTable,
  },
})
export default class Home extends Vue {
  public filename: string | null = null;
  public text: string | null = null;
  public words: Word[] = [];

  public textRead(filename: string, text: string) {
    this.filename = filename;
    this.text = text;
    this.words = this.textToWords(text);
  }

  public textToWords(text: string): Word[] {
    if (!text) { return []; }
    const words: Word[] = [];
    const lines = text.trim().split("\n");
    for (let i = 0; i < lines.length; i++) {
      const content = lines[i].split("\t");
      if (content[0] === "EOS") {
        words.push(new Word(i, content[0], null, false));
      } else {
        let cls: string = content[2] || "O";
        if (cls !== "O") {
          cls = cls.slice(2);
          if (!CLASSES.includes(cls)) cls = "O";
        }
        words.push(new Word(i, content[0], cls, false));
      }
    }
    return words;
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

