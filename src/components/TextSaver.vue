<template>
  <div v-if="filename !== null">
    <a id="download-link"
      class="button is-primary" 
      @click="download" 
      :href="downloadLink" 
      :download="annotatedName()"
    >
      ダウンロード
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TextSaver extends Vue {
  @Prop({required: true})
  public filename!: string;

  @Prop({required: true})
  public text!: string;

  @Prop({required: true})
  public words!: object[];

  private downloadLink: string = "#";

  private annotatedName(): string {
    if (this.filename === null) return "#";
    const parts = this.filename.split('.');
    const name = parts.splice(0, parts.length - 1).join(".");
    return name + "_annotated";
  }

  private downloadText(fileName: string, content: string) {
    const blob = new Blob( [ content ], { type: 'text/plain' } );
    const blobAvailable = window.navigator.msSaveBlob !== undefined;
    if ( blobAvailable ) {
        window.navigator.msSaveBlob( blob, fileName );
        return;
    }
    this.downloadLink = URL.createObjectURL( blob );
  }

  private download() {
    let result: string = "";
    const words = Object.assign(this.words);
    const lines = this.text.split("\n");

    let lastCls: string | null = null;
    lines.forEach((line) => {
      if (line === "EOS") {
        result += "EOS\n";
        return;
      }
      const word = words.shift();
      let cls = word.cls;
      // OでなければIまたはBをつける
      if (cls !== "O") {
        if (lastCls && lastCls === cls) {
          // 前と同じならI-を追加
          cls = "I-" + cls;
        } else {
          // 前と違うならB-を追加
          cls = "B-" + cls;
        }
      }
      lastCls = word.cls;
      const lineWithoutClass = line.split('\t').splice(0, 2);
      result += lineWithoutClass + "\t" + cls + "\n";
    });
    this.downloadText(this.annotatedName(), result);
  }
}
</script>

<style scoped>

</style>
