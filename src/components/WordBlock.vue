<template>
  <div class="box word-block" 
    :class="{selected: selected}" 
    @click="click"
  >
    <slot></slot><br>
    <div class="select is-small">
      <select 
        @click.stop="" 
        @change="change" 
        @keydown.exact.esc="onUnselect"
        @keydown.exact.enter="select"
        @keydown="shortcut"
      >
        <option v-for="c in classes" :key="c" :selected="c==cls">
          {{ c }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue} from 'vue-property-decorator';

@Component
export default class WordBlock extends Vue {
  @Prop({required: true})
  public legend!: any;

  @Prop({required: true})
  public classes!: string[];

  @Prop({required: true})
  public id!: number;

  @Prop({required: true})
  public selected!: boolean;

  @Prop()
  public cls?: string;

  @Emit('onSelect')
  public onSelect(id: number) {}

  @Emit('onChange')
  public onChange(id: number, cls: string) {}

  @Emit('onUnselect')
  public onUnselect() {}

  public click(e: any) {
    this.onSelect(this.id);
    e.currentTarget.children[1].children[0].focus(); // selectにフォーカス
  }

  public select() {
    if (!this.selected) this.onSelect(this.id);
  }

  public change(e: any) {
    const id = e.target.selectedIndex;
    const selectedCls: string = this.classes[id];
    this.onChange(this.id, selectedCls);
  }

  public shortcut(e: any) {
    if (!this.selected) return;
    for (const cls in this.classes) {
      if (!this.legend[cls]) continue;
      if (this.legend[cls].shortcut === e.key.toUpperCase()) {
        this.onChange(this.id, cls);
        return;
      }
    }
  }
}
</script>

<style scoped>
  .word-block {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    margin: 7px;
  }

  .selected {
    background-color: chocolate;
    color: whitesmoke
  }
</style>
