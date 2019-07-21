<template>
  <div class="file has-name is-fullwidth">
    <label class="file-label">
      <input id="reader" class="file-input" type="file" name="resume" @change="onFileChange">
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          入力ファイルを選択
        </span>
      </span>
      <span class="file-name">
        {{ filename || "ファイルが選択されていません"}}
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component
export default class TextReader extends Vue {
  private filename: string | null = null;

  @Emit("onTextRead")
  public onTextRead(filename: string, text: string) {}

  private onFileChange(e: any) {

    if (this.filename !== null) {
      const confText = "編集中の内容は保存されません．\n新しいファイルを読み込みますか？";
      if (!confirm(confText)) return;
    }

    const files = e.target.files || e.dataTransfer.files;
    this.filename = files[0].name;
    this.readFile(files[0].name, files[0]);
  }

  private readFile(filename: string, file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      this.onTextRead(filename, e.target.result);
    };
    reader.readAsText(file);
  }
}
</script>

<style scoped>

</style>
