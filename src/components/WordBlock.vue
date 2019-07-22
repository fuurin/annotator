<template>
  <div class="box word-block" 
    :class="{selected: word.selected}" 
    @click="click"
    @keydown.exact.esc="onUnselect"
    @keydown.exact.enter="select"
  >
    {{ word.word }}<br>
    <ClassSelector 
      :selected="word.cls" 
      @onClick="clickSelector"
      @onChange="change">
    </ClassSelector>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue} from 'vue-property-decorator';
import { Word } from '@/types/Word.ts';
import ClassSelector from '@/components/ClassSelector.vue';

@Component({
  components: {
    ClassSelector,
  },
})
export default class WordBlock extends Vue {
  @Prop({required: true})
  public word!: Word;

  @Emit('onSelect')
  public onSelect(id: number, unselectForSame: boolean = true) {}

  @Emit('onUnselect')
  public onUnselect() {}

  public click(e: any) {
    this.onSelect(this.word.id);
    e.currentTarget.children[1].children[0].focus(); // selectにフォーカス
  }

  public clickSelector() {
    this.onSelect(this.word.id, false);
  }

  public select() {
    if (!this.word.selected) this.onSelect(this.word.id);
  }

  public change(cls: string) {
    if (!this.word.selected) return;
    this.word.cls = cls;
  }
}
</script>

<style scoped>
  .word-block {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    margin: 5px;
    padding: 8px;
  }

  .selected {
    background-color: chocolate;
    color: whitesmoke
  }
</style>
