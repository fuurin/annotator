<template>
  <div>
    <a id="download-link"
      class="button is-primary" 
      @click="download" 
      :href="downloadLink" 
      :download="filename"
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
    this.downloadText(this.filename + "_annotated", result);
  }
}
</script>

<style scoped>

</style>
