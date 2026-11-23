// 每日任務規則：今天的任務有沒有達成
// 對應規則書：「每日任務與結算」；任務內容在 days.js
// 驗收：npm run check 的「每日任務規則」

import { GYOZA_IDS } from '../menu.js';

// 輸入：
//   task    今天的任務（days.js 裡的 { id, text, bonus }）
//   report  今天的營業結果，會用到的欄位：
//             report.wasteTotal  今天報廢的總份數
//             report.visits      每位客人的結果陣列，每筆有 outcome（'bought'、'sold_out'…）
//             report.sold        每樣菜賣出幾份，例如 { signature: 20, tea: 5 }
//             report.starsAfter  打烊後的星等
//             report.profit      今天的淨利（不含獎金）
// 回傳：'done'（達成）| 'failed'（沒達成）| 'wip'（施工中）

// 規則書「每日任務與結算」的門檻
const GYOZA_GOAL = 30; // 第 3 天：鍋貼三種合計賣出份數
const STARS_GOAL = 4; // 第 4 天：打烊後星等
const PROFIT_GOAL = 800; // 第 5 天：單日淨利（不含獎金）

// 每個任務 id 怎麼判定：回傳 true 代表達成
const TASK_CHECKS = {
  'zero-waste': (r) => r.wasteTotal === 0,
  'no-soldout-leave': (r) => !r.visits.some((v) => v.outcome === 'sold_out'),
  'gyoza-30': (r) => GYOZA_IDS.reduce((sum, id) => sum + (r.sold[id] ?? 0), 0) >= GYOZA_GOAL,
  'stars-4': (r) => r.starsAfter >= STARS_GOAL,
  'profit-800': (r) => r.profit >= PROFIT_GOAL,
};

export function checkTask(task, report) {
  const isDone = TASK_CHECKS[task?.id];
  if (!isDone) {
    return 'wip';
  }
  return isDone(report) ? 'done' : 'failed';
}
