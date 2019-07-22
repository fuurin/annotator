<template>
  <div>
    <Editor :legend="legend" :text="text" :words="words" @onUpdate="onUpdate"></Editor>
    <TextSaver :filename="filename" :text="text" :words="words"></TextSaver>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Editor from '@/components/Editor.vue';
import TextSaver from '@/components/TextSaver.vue';

@Component({
  components: {
    Editor,
    TextSaver,
  },
})
export default class Sheet extends Vue {

  @Prop({required: true})
  public legend!: any[];

  @Prop({required: true})
  public classes!: string[];

  @Prop({required: true})
  public filename!: string;

  @Prop({required: true})
  public text!: string;

  public words: object[] = [];

  @Watch('filename')
  public onFilenameChanged() {
    this.words = this.textToWords(this.text);
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

</style>
