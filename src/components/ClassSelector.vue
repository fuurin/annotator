<template>
  <div class="select is-small">
    <select 
      @click.stop="onClick"
      @change="change" 
      @keydown="shortcut"
    >
      <option v-for="leg in legend" :key="leg.cls" :selected="leg.cls==selected">
        {{ leg.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Legend, LEGEND, CLASSES } from '@/types/Legend.ts';

@Component
export default class ClassSelector extends Vue {
  @Prop()
  public selected?: string;

  private legend: Legend[] = LEGEND;

  @Emit("onClick")
  public onClick() {}

  @Emit('onChange')
  public onChange(cls: string) {}

  public change(e: any) {
    const id = e.target.selectedIndex;
    const selectedCls: string = CLASSES[id];
    this.onChange(selectedCls);
  }

  public shortcut(e: any) {
    for (const leg of LEGEND) {
      if (leg.shortcut === e.key.toUpperCase()) {
        this.onChange(leg.cls);
        return;
      }
    }
  }
}
</script>

<style scoped>

</style>
