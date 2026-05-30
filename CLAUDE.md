# 概要
本WebページはGitHub Pagesで公開するホームページです。

## 会社概要
- 会社名: 株式会社サンエイクローバー
- 資本金: 990万円
- 住所: 〒170-0013 東京都豊島区東池袋 2丁目62番8号 BIGオフィスプラザ池袋1206
- 電話番号: 03-6876-4989

# 画面定義
会社のホームページを１ページに凝縮します。
その上で１社員＝１ページで公開します。

## 画面一覧
- トップページ (index.html)
- 404ページ (404.html)
- プライバシーポリシー (privacy.html)
- 私のプロフィール (profiles/takuya-nakanishi/index.html)

## Web問合せフォーム
### POST先:
https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DdL00000wN69l

### フォームパラメータ
oid="00DdL00000wN69l" (固定値)
lead_source="Web問合せ" (固定値)
phone={電話 / PHONE 欄の値}
first_name={氏名 / NAME 欄の苗字値 (スペースで分割した1つ目の値)}
last_name={氏名 / NAME 欄の名前値 (スペースで分割した2つ目以降すべての値)}
email={メール / EMAIL欄の値}
description={ご相談内容 / MESSSAGE 欄の値}

# ローカル動作確認
- ポートは 8080 を使う事

# Google Analytics 4
- 測定ID: G-R362SW6WBR
- 設置対象: 全ページ (index.html / 404.html / privacy.html / profiles/*)
- 設置方法: Jekyll の `_includes/google-analytics.html` に gtag スニペットを定義し、各HTMLの `<head>` 内（できるだけ上部）で `{% include google-analytics.html %}` により読み込む