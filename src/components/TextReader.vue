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
  @Prop({required: true})
  private maxFiles!: number;

  @Prop()
  private files: any[] = [];

  @Emit()
  private input(files: any[]) {}

  private onFileChange(e: any) {

    if (this.files) {
      const confText = "編集中の内容は保存されません．\n新しいファイルを読み込みますか？";
      if (!confirm(confText)) return;
    }

    const fileList: any[] = [];

    const files = e.target.files || e.dataTransfer.files;
    for (let i = 0; i < this.maxFiles; i++) {
      const name: string = files[i].name;
      if (name) fileList.push(this.readFile(files[0].name, files[0]));
    }

    this.input(fileList);
  }

  private readFile(filename: string, file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      return {name: filename, text: e.target.result};
    };
    reader.readAsText(file);
  }
}
</script>

<style scoped>

</style>
