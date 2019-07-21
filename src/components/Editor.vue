<template>
    <div style="background-color: orange;">
      <div v-for="word in words" :key="word">
        {{ word.word }}|{{ word.cls }}
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Editor extends Vue {
  @Prop()
  public text: string | null = null;
  public words: object[] = [];

  @Watch('text')
  public textToWords() {
    if (this.text === null) { return; }

    for (const line of this.text.split("\n")) {
      if (line === "EOS") break;
      const word = line.split("\t");
      this.words.push({word: word[0], cls: word[2] || "O"});
    }
  }

}
</script>

<style scoped>

</style>
