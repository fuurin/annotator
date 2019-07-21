<template>
  <div>
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

  private zip(arr1: any[], arr2: any[]): any[] {
    return arr1.map((_, i) => [arr1[i], arr2[i]]);
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

    this.zip(this.text.split("\n"), this.words).forEach((pair) => {
      if (pair[0] === "EOS") return;
      result += pair[0] + "\t" + pair[1].cls + "\n";
    });
    this.downloadText(this.annotatedName(), result);
  }
}
</script>

<style scoped>

</style>
