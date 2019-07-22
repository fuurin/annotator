<template>
  <div v-if="filename !== null">
    <a id="download-link"
      class="button is-primary" 
      @click="download" 
      :href="downloadLink" 
      :download="annotatedName()"
    >
      <i class="fas fa-download"></i>&nbsp;
      ダウンロード
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Word } from '@/types/Word.ts';

@Component
export default class TextSaver extends Vue {
  @Prop({required: true})
  public filename!: string;

  @Prop({required: true})
  public text!: string;

  @Prop({required: true})
  public words!: Word[];

  private downloadLink: string = "#";

  private annotatedName(): string {
    if (this.filename === null) return "#";
    const parts = this.filename.split('.');
    const name = parts.splice(0, parts.length - 1).join(".");
    return name.endsWith("_annotated") ? name : name + "_annotated";
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
    const lines: string[] = this.text.split("\n");

    let lastCls: string | null = null;
    for (let i = 0; i < lines.length; i++) {
      const line: string[] = lines[i].split("\t").splice(0, 2);
      if (line[0] === "EOS") {
        result += "EOS\n";
        continue;
      }
      const word = this.words[i];
      let cls = word.cls;
      if (cls !== "O") { // OでなければIまたはBをつける
        if (lastCls && lastCls === cls) {
          cls = "I-" + cls; // 前と同じならI-を追加
        } else {
          cls = "B-" + cls; // 前と違うならB-を追加
        }
      }
      lastCls = word.cls;
      result += line.join('\t') + "\t" + cls + "\n";
    }

    this.downloadText(this.annotatedName(), result.trim());
  }
}
</script>

<style scoped>

</style>
