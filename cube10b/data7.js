/*

〇このファイルに記述しているデータ

vts1 : 10個の立方体の相貫体の頂点リスト

index1 : 　立方体のポリゴンインデックスリスト（2次元配列）を10個まとめた3次元配列（0番始まり）

edge1 : 10個の立方体の相貫体の辺のインデックスリスト（0番始まり）

*/

const vts1 = '[[0,0,0],[1., 1., 1.], [1.38743, -0.90082, 0.513394], [-0.513394, -1.38743, 0.90082], [-0.90082, 0.513394, 1.38743], [0.513394, 1.38743, -0.90082], [0.90082, -0.513394, -1.38743], [-1., -1.,-1.], [-1.38743, 0.90082, -0.513394]]';
const vts2 = '[[0,0,0],[1.618033988749895, 0.6180339887498949, 0], [0.8306886792158458, -0.5567372075069474, -1.414213562373095],[0.04334336968179642, -1.73150840376379, 0], [0.8306886792158457, -0.5567372075069474, 1.4142135623730951],[-0.04334336968179642, 1.73150840376379, 0], [-0.8306886792158457, 0.5567372075069474, -1.4142135623730951],[-1.618033988749895, -0.6180339887498949, -5.551115123125783*0*-17], [-0.8306886792158458, 0.5567372075069474, 1.414213562373095]]';
const vts3 = '[[0,0,0],[1., 1., -1.], [-0.9008197245479442, 0.513393837825151, -1.3874258867227933], [-0.5133938378251511, -1.3874258867227933, -0.9008197245479442],[1.3874258867227933, -0.9008197245479442, -0.513393837825151], [0.5133938378251511, 1.3874258867227933, 0.9008197245479442],[-1.3874258867227933, 0.9008197245479442, 0.513393837825151], [-1., -1., 1.], [0.9008197245479442, -0.513393837825151, 1.3874258867227933]]';
const vts4 = '[[0,0,0],[0, 1.618033988749895, -0.6180339887498949], [-1.4142135623730954, 0.8306886792158458, 0.5567372075069476],[-1.4142135623730951, -0.8306886792158458, -0.5567372075069476], [0, -0.04334336968179653, -1.73150840376379],[1.4142135623730951, 0.8306886792158458, 0.5567372075069476], [0, 0.04334336968179653, 1.73150840376379],[0, -1.618033988749895, 0.6180339887498949], [1.4142135623730954, -0.8306886792158458, -0.5567372075069476]]';
const vts5 = '[[0,0,0],[5.551115123125783*0*-17, 1.618033988749895, 0.6180339887498949], [1.1102230246251565*0*-16, -0.043343369681796584, 1.7315084037637898],[-1.4142135623730954, -0.8306886792158458, 0.5567372075069474], [-1.4142135623730951, 0.8306886792158458, -0.5567372075069474],[1.4142135623730954, 0.8306886792158458, -0.5567372075069474], [1.4142135623730951, -0.8306886792158458, 0.5567372075069473],[-5.551115123125783*0*-17, -1.618033988749895, -0.6180339887498949], [-1.1102230246251565*0*-16, 0.043343369681796584, -1.7315084037637898]]';
const vts6 = '[[0,0,0],[0.6180339887498949, 0., 1.618033988749895], [-0.5567372075069474, -1.4142135623730951, 0.8306886792158458], [-1.7315084037637898, 0., 0.043343369681796494],[-0.5567372075069474, 1.4142135623730951, 0.8306886792158458], [1.7315084037637898, 0., -0.0433433696817965], [0.5567372075069474, -1.4142135623730951, -0.8306886792158457],[-0.6180339887498949, 0., -1.618033988749895], [0.5567372075069474, 1.4142135623730951, -0.8306886792158457]]';
const vts7 = '[[0,0,0],[1.6180339887498947, -0.6180339887498948, 1.1102230246251565*0*-16], [-0.04334336968179642, -1.7315084037637898, 1.1102230246251565*0*-16],[-0.8306886792158457, -0.5567372075069473, 1.4142135623730951], [0.8306886792158458, 0.5567372075069477, 1.4142135623730951],[0.8306886792158457, 0.5567372075069473, -1.4142135623730951], [-0.8306886792158458, -0.5567372075069477, -1.414213562373095],[-1.6180339887498947, 0.6180339887498948, -1.1102230246251565*0*-16], [0.04334336968179642, 1.7315084037637898, -5.551115123125783*0*-17]]';
const vts8 = '[[0,0,0],[0.6180339887498948, 1.6653345369377348*0*-16, -1.618033988749895], [-0.5567372075069477, -1.4142135623730951, -0.8306886792158458],[0.5567372075069473, -1.4142135623730951, 0.8306886792158457], [1.7315084037637898, 0., 0.04334336968179631], [-0.5567372075069473, 1.4142135623730951, -0.8306886792158457],[-1.7315084037637896, -1.1102230246251565*0*-16, -0.04334336968179642], [-0.6180339887498948, -1.6653345369377348*0*-16, 1.618033988749895],[0.5567372075069477, 1.414213562373095, 0.8306886792158457]]';
const vts9 = '[[0,0,0],[-0.9999999999999999, 1., -1.], [-1.3874258867227933, -0.9008197245479441, -0.5133938378251511], [0.5133938378251509, -1.387425886722793, -0.9008197245479441],[0.9008197245479441, 0.513393837825151, -1.3874258867227933], [-0.5133938378251509, 1.387425886722793, 0.9008197245479441],[-0.9008197245479443, -0.5133938378251509, 1.387425886722793], [0.9999999999999999, -1., 1.], [1.387425886722793, 0.9008197245479442, 0.513393837825151]]';
const vts10 = '[[0,0,0],[-0.9999999999999998, 0.9999999999999999, 1.], [-1.3874258867227933, -0.9008197245479441, 0.513393837825151], [-0.9008197245479441, -0.5133938378251509, -1.387425886722793],[-0.513393837825151, 1.3874258867227933, -0.9008197245479439], [0.9008197245479441, 0.5133938378251509, 1.387425886722793], [0.513393837825151, -1.3874258867227933, 0.900819724547944],[0.9999999999999998, -0.9999999999999999, -1.], [1.3874258867227933, 0.9008197245479441, -0.513393837825151]]';


const index1 = [[1, 4, 3, 2], [5, 6, 7, 8], [1, 2, 6, 5], [1, 5, 8, 4], [3, 4, 8, 7], [2, 3, 7, 6]];