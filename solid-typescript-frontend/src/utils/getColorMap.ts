const m = new Map([
  ['0', '普通'],
  ['1', '稀有'],
  ['2', '优秀'],
  ['3', '史诗'],
  ['4', '传说'],
]);
const m2 = new Map([
  ['0', '#898989'],
  ['1', '#91fc3c'],
  ['2', '#5c86ff'],
  ['3', '#7e1ea5'],
  ['4', '#ed9529'],
]);
function getColorMap(state: string) {
  return {
    quality: m.get(String(state)),
    color: m2.get(String(state)),
  };
}
export default getColorMap;
