<template>
  <div class="editor box has-text-white"
    @keydown.exact.tab="onTab" 
    @keydown.shift.tab="onTabBack"
  >
    <p v-if="words.length === 0">ここに単語が表示されます．</p>

    <WordBlock v-for="word in words" 
      :key="word.id" 
      :legend="legend"
      :classes="classes"
      :id="word.id"
      :cls="word.cls" 
      :selected="word.selected" 
      @onSelect="onSelect" 
      @onChange="onChange" 
      @onUnselect="unselect"
    >
      {{ word.word }}
    </WordBlock>
    <input type="hidden" id="keyboard">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import WordBlock from '@/components/WordBlock.vue';

@Component({
  components: {
    WordBlock,
  },
})
export default class Editor extends Vue {
  @Prop({required: true})
  public legend!: object;

  @Prop()
  public text: string | null = null;

  @Prop({required: true})
  public words!: any[];

  private classes: string[] = [];
  private selected: number | null = null;

  public created() {
    this.classes = Object.keys(this.legend);
  }

  @Emit('onUpdate')
  public onUpdate(id: number, attr: string, value: any) {}

  public onSelect(id: number) {
    if (this.selected !== id) { // 違う単語を選んだ時
      // すでに選ばれているものがあればそれを解除
      if (this.selected !== null) {
        this.onUpdate(this.selected, 'selected', false);
      }
      this.onUpdate(id, 'selected', true); // 選ばれた単語を選択状態にする
      this.selected = id; // 現在選択されている単語のIDを保持する
    } else this.unselect(); // 同じ単語をクリックした時は選択解除
  }

  public unselect() {
    if (!this.selected) return;
    this.onUpdate(this.selected, 'selected', false);
    this.selected = null;
  }

  public onChange(id: number, cls: string) {
    this.onUpdate(id, 'cls', cls);
  }

  public onTab() {
    if (this.selected === null) return;
    if (this.selected >= this.words.length - 1) return;
    this.onSelect(this.selected + 1);
  }

  public onTabBack() {
    if (this.selected === null) return;
    if (this.selected <= 0) return;
    this.onSelect(this.selected - 1);
  }
}
</script>

<style scoped>
  .editor {
    background-color: orange;
    text-align: left;
  }
</style>
