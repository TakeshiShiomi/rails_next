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

### github actions について

POSTGRES_PASSWORD 等の値は GitHub Secrets に設定する必要がある

#### GitHub Secrets の設定方法

1. **リポジトリの設定に移動**:
   - GitHub リポジトリのトップページに移動し、右上の「Settings」タブをクリックします。
2. **Secrets の設定**:
   - 左側のメニューから「Secrets and variables」 > 「Actions」を選択します。
3. **新しいシークレットを追加**:
   - 「New repository secret」ボタンをクリックし、以下のようにシークレットを追加します。
     - DOCKER_USERNAME: Docker Hub のユーザー名
     - DOCKER_PASSWORD: Docker Hub のパスワード
     - POSTGRES_USER: PostgreSQL のユーザー名
     - POSTGRES_PASSWORD: Postgres のパスワード
