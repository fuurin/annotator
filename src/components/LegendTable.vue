<template>
  <div class="list">
    <div class="list-item" v-for="leg in legend" :key="leg.cls">
      {{ leg.name }}：
      <span v-html="colorShortcut(leg.cls, leg.shortcut)">
      </span>
      <br>
      <small>例: {{ leg.example }}</small>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Legend, LEGEND } from '@/types/Legend.ts';

@Component
export default class LegendTable extends Vue {
  private legend: Legend[] = LEGEND;
  private colorShortcut(cls: string, shortcut: string): string {
    const replaced: string = '<span class="has-text-danger">' + shortcut + '</span>';
    return cls.replace(shortcut, replaced);
  }
}
</script>

<style scoped>
  .list-item {
    text-align: left;
  }
</style>
