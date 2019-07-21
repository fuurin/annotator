<template>
  <div class="list">
    <div class="list-item" v-for="(item, cls) in legend" :key="cls">
      <span v-html="colorShortcut(cls, item.shortcut)">
      </span>
      ：{{ item.name }}<br>
      <small>例: {{ item.example }}</small>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Legend extends Vue {
  @Prop({required: true})
  public legend!: object;

  public colorShortcut(cls: string, shortcut: string): string {
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
