# line-appointment-manager

## 開発環境
- Google Apps Script
- Line Messaging API


## 仕様

### 環境変数
<p>複製して変更がしやすいよう、スプレッドシート上に変数を定義</p>
<img src="https://user-images.githubusercontent.com/39648121/63211191-d7853b00-c12e-11e9-8429-2f93b6ca2262.png" width="50%">

### 使い方
1. ユーザーがLineのリッチメニュー上から面談開始時間を選択
2. 選択時間を元にカレンダーに予定を記録
3. 前日にカレンダーの予定からリマインドメッセージを送信


## スクリーンショット
### 1. ユーザーがLineのリッチメニュー上から面談開始時間を選択
<img src="https://user-images.githubusercontent.com/39648121/63211177-c5a39800-c12e-11e9-9121-48aaea6fa697.png" width="50%">
<img src="https://user-images.githubusercontent.com/39648121/63211178-c5a39800-c12e-11e9-824e-0fcb70169d72.png" width="50%">
<img src="https://user-images.githubusercontent.com/39648121/63211179-c5a39800-c12e-11e9-868e-a43d24e6dc11.png" width="50%">
<img src="https://user-images.githubusercontent.com/39648121/63211180-c63c2e80-c12e-11e9-8164-704d6d9266e1.png" width="50%">

### 2. 選択時間を元にカレンダーに予定を記録
<img src="https://user-images.githubusercontent.com/39648121/63212440-ad884480-c13f-11e9-8259-b838df98d9f8.png" width="50%">

### 3. 明日の予定からリマインドメッセージを送信(トリガーで毎日実行)
<img src="https://user-images.githubusercontent.com/39648121/63212439-acefae00-c13f-11e9-8840-76268c4d45e4.png" width="50%">
<img src="https://user-images.githubusercontent.com/39648121/63212503-68184700-c140-11e9-86f6-670dd083430d.png" width="50%">
