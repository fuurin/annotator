<template>
  <div class="box word-block" 
    :class="{selected: selected}" 
    @click="click"
  >
    <slot></slot><br>
    <div class="select is-small">
      <select @click.stop="" @change="change">
        <option v-for="c in classes" :key="c" :selected="c==cls">
          {{ c }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component
export default class WordBlock extends Vue {
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

  public click(e: any) {
    this.onSelect(this.id);
    // selectにフォーカス
  }

  public change(e: any) {
    const selectedCls: string = this.classes[e.target.selectedIndex];
    this.onChange(this.id, selectedCls);
  }

  public created() {
    // document.getElementsByClassName("word-block")[this.id].addEventListener('keydown', (e: any) => {
    //   console.log(e.keyCode);
    // });
  }

  public shortcutSelect(e: any) {
    if (!this.selected) return;
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
