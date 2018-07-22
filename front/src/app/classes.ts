export class BlockPlace {
  constructor(public name: string, public sequence: number, public position: number, public width: number) { }
}

export class Section {
  constructor(public name: string, public sequence: number, public blocks: BlockPlace[]) { }
}

export class SplitView {
  constructor(public name: string, public width: number, public position: string) {
  }
}

export class Config {
  constructor(public splitView?: SplitView, public sections?: Section[]) {
  }
}
