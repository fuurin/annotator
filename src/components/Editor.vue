<template>
  <div class="editor box"
    @keydown.exact.tab="onTab" 
    @keydown.shift.tab="onTabBack"
  >
    <WordBlock v-for="word in words" 
      :key="word.id" 
      :id="word.id"
      :cls="word.cls" 
      :selected="word.selected" 
      :classes="classes"
      @onSelect="onSelect" 
      @onChange="onChange"
      >
      {{ word.word }}
    </WordBlock>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WordBlock from '@/components/WordBlock.vue';

@Component({
  components: {
    WordBlock,
  },
})
export default class Editor extends Vue {
  @Prop({required: true})
  public legend!: object[];

  @Prop()
  public text: string | null = null;

  public words: any[] = [];

  private classes: string[] = [];
  private selected: number | null = null;

  public created() {
    this.classes = Object.keys(this.legend);
  }

  public onSelect(id: number) {
    if (this.selected !== id) { // 違う単語を選んだ時
      // すでに選ばれているものがあればそれを解除
      if (this.selected !== null) {
        this.words[this.selected].selected = false;
      }
      this.words[id].selected = true; // 選ばれた単語を選択状態にする
      this.selected = id; // 現在選択されている単語のIDを保持する
    } else { // 同じ単語をクリックした時は選択解除
      this.words[id].selected = false;
      this.selected = null;
    }
  }

  public onChange(id: number, cls: string) {
    this.words[id].cls = cls;
  }

  public onTab() {
    if (this.selected === null) return;
    if (this.selected >= this.words.length) return;
    this.onSelect(this.selected + 1);
  }

  public onTabBack() {
    if (this.selected === null) return;
    if (this.selected <= 0) return;
    this.onSelect(this.selected - 1);
  }

  @Watch('text')
  public textToWords() {
    if (this.text === null) { return; }

    let id: number = 0;
    for (const line of this.text.split("\n")) {
      if (line === "EOS") break;
      const word = line.split("\t");
      let cls: string = word[2] || "O";
      if (cls !== "O" && !this.classes.includes(cls)) cls = "O";
      this.words.push({id: id++, word: word[0], cls, selected: false});
    }
  }

}
</script>

<style scoped>
  .editor {
    background-color: orange;
    text-align: left;
  }
</style>
