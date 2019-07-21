export default function (unitString: string) {
  if (unitString.trim().length === 0) {
    this.value = null;
    return;
  }

  const unit = unitString.replace(/\(|\)/gm, '').replace(/\d+|[¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞↉]/gm, '').trim();

  if (unit.length === 0) {
    return this.value = null;
  }

  this.value = unit;
}
