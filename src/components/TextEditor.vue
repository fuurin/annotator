<template>
  <div class="editor box has-text-white"
    @keydown.exact.tab="tab" 
    @keydown.shift.tab="tabBack"
  >
    <p v-if="words.length === 0">ここに単語が表示されます．</p>
    <span v-else>
      <p class="shortcut is-small has-text-grey-dark">
        <i class="far fa-keyboard"></i>
        Shift + tab：<i class="fas fa-arrow-left"></i>　
        tab：<i class="fas fa-arrow-right"></i>
      </p>
    </span>
    <span v-for="word in words" :key="word.id">
      <WordBlock 
        v-if="word.cls" 
        :word="word"
        @onSelect="select" 
        @onUnselect="unselect"
      >
      </WordBlock>
      <div v-else-if="word.cls === null">
        <hr>
      </div>
    </span>
    <input type="hidden" id="keyboard">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Word } from '@/types/Word.ts';
import WordBlock from '@/components/WordBlock.vue';

@Component({
  components: {
    WordBlock,
  },
})
export default class TextEditor extends Vue {
  @Prop({required: true})
  public words!: Word[];

  private selected: number | null = null;

  public select(id: number, unselectForSame: boolean = true) {
    if (this.selected !== id) { // 違う単語を選んだ時
      if (this.selected !== null) this.unselect(); // すでに選ばれているIDを解除
      this.words[id].selected = true; // 選ばれた単語を選択状態にする
      this.selected = id; // 現在選択されている単語のIDを保持する
    } else if (unselectForSame) this.unselect(); // 同じ単語をクリックした時は選択解除
  }

  public unselect() {
    if (this.selected === null) return;
    this.words[this.selected].selected = false;
    this.selected = null;
  }

  public tab() {
    if (this.selected === null) return;
    let next: number = this.selected + 1;
    if (!this.words[next]) return;
    if (this.words[next].cls === null) next++;
    if (next < this.words.length) this.select(next);
  }

  public tabBack() {
    if (this.selected === null) return;
    let next: number = this.selected - 1;
    if (!this.words[next]) return;
    if (this.words[next].cls === null) next--;
    if (next >= 0) this.select(next);
  }
}
</script>

<style scoped>
  .editor {
    background-color: orange;
    text-align: left;
  }

  .shortcut {
    margin-left: 6px;
    margin-bottom: 3px;
  }
</style>
