export class Word {
  constructor(
    public id: number,
    public word: string,
    public cls: string | null,
    public selected: boolean,
  ) {}
}
