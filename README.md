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

フロント

```zsh
docker compose run frontend npx create-next-app@latest
```
