# 第三次規則修正：說話規則（speech.js）修改前後結果

- 修改檔案：web-lab/src/game/rules/speech.js
- 修改內容：pickLine 改成回傳客人包裡這位客人對應結果的台詞（customer.lines[outcome]），沒有就回傳 null

## 摘要

| 項目 | 修改前 | 修改後 |
|---|---|---|
| npm run check 說話規則 | 0／5 PASS | 5／5 PASS |
| 全部還沒通過 | 27 條 | 22 條 |
| 泡泡內容 | 永遠沒有（null） | 依結果顯示客人的台詞 |

## 畫面泡泡（官方客人包、招牌 5 份 70 元、紅茶 10 杯 25 元，第 1 天）

修改前：所有客人泡泡都是 null（不顯示）。修改後：

```
上班族｜bought｜泡泡："吃飽了，下午開會不怕了。"
窮學生｜too_expensive｜泡泡："太貴了啦，學生吃不起。"
韭菜控阿伯｜not_on_menu｜泡泡："沒有韭菜的？那不用了。"
怕韭菜的 OL｜bought｜泡泡："玉米的好清爽，下次再來。"
窮學生｜sold_out｜泡泡："又賣完了，學生的命就是苦。"
上班族｜sold_out｜泡泡："賣完了？早知道早點下樓。"
怕韭菜的 OL｜not_on_menu｜泡泡："沒有玉米鍋貼？好可惜。"
```

## npm run check：修改前

```
════════ 總結 ════════
✅ 引擎　　　　　　 8／8 PASS
✅ 客人包檢查　　　 7／7 PASS
✅ 硬規則　　　　　 8／8 PASS
✅ 成交規則　　　　 6／6 PASS
✅ 收支規則　　　　 8／8 PASS
❌ 口碑規則　　　　 4／11 PASS
❌ 每日任務規則　　 0／10 PASS
❌ 說話規則　　　　 0／5 PASS
❌ 倉庫盤點規則　　 4／9 PASS

還有 27 條沒通過。對照規則書，看看是哪一條規則沒照做。
```

## npm run check：修改後

```
════════ 總結 ════════
✅ 引擎　　　　　　 8／8 PASS
✅ 客人包檢查　　　 7／7 PASS
✅ 硬規則　　　　　 8／8 PASS
✅ 成交規則　　　　 6／6 PASS
✅ 收支規則　　　　 8／8 PASS
❌ 口碑規則　　　　 4／11 PASS
❌ 每日任務規則　　 0／10 PASS
✅ 說話規則　　　　 5／5 PASS
❌ 倉庫盤點規則　　 4／9 PASS

還有 22 條沒通過。對照規則書，看看是哪一條規則沒照做。
```

## git diff（speech.js）

```diff
diff --git a/web-lab/src/game/rules/speech.js b/web-lab/src/game/rules/speech.js
index 28d5249..2cc4547 100644
--- a/web-lab/src/game/rules/speech.js
+++ b/web-lab/src/game/rules/speech.js
@@ -7,5 +7,5 @@
 //   outcome   'bought' | 'hated_on_menu' | 'not_on_menu' | 'sold_out' | 'too_expensive'
 // 回傳：要顯示在泡泡裡的那句話；不說話就回傳 null
 export function pickLine(customer, outcome) {
-  return null;
+  return customer?.lines?.[outcome] ?? null;
 }
```
