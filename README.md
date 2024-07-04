## 環境構築

### バックエンド

下記コマンドを実行して新規で作成した

```zsh
docker compose run --rm backend rails new . --force --database=postgresql --api
docker compose up --build
docker compose exec backend rails db:create
docker compose run --rm backend bundle exec rails g scaffold post title:string body:text
```

### フロントエンド

下記コマンドを実行

```zsh
docker compose run frontend npx create-next-app@latest
# mya-appに指定アプリ名によってdocker-composeの中身編集する必要あり
docker compose up
```

### 環境構築参照サイト

https://qiita.com/shinKoala99/items/5c1f21996b7f3980cc06

### api 参照サイト

https://qiita.com/y_mizuta/items/c5f5348281a307969725 rack-cors の設定も含む
https://speakerdeck.com/hokaccha/railsenziniafalsetamefalsenext-dot-jsru-men?slide=29
