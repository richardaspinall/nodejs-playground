// Comparison of OOO (top / imperative) and functional programming (bottom):
// https://probablydance.com/2016/02/27/functional-programming-is-not-popular-because-it-is-weird/

class Emoji {
  private _prev: string = '';
  constructor(private _icon: string) {}
  get icon() {
    return this._icon;
  }

  get prev() {
    return this._prev;
  }
  change(val: string) {
    this._prev = this._icon;
    this._icon = val;
  }
}

const emoji = new Emoji('😀');

console.log(emoji.icon, emoji.prev);

emoji.change('⭐️');
emoji.change('❤️');

console.log(emoji.icon, emoji.prev);

// Static Methods

class Emoji2 {
  static addOneTo(val: number) {
    return 1 + val;
  }
}

console.log(Emoji2.addOneTo(3));
