export class Note {
  constructor(
    public id: string,
    public title: string,
    public content: string, // en Markdown
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  static fromJson(json: any): Note {
    return new Note(
      json.id,
      json.title,
      json.content,
      new Date(json.createdAt),
      new Date(json.updatedAt)
    )
  }

  toJson(): object {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    }
  }
}
