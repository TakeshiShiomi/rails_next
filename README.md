## 環境構築

### バックエンド

下記コマンドを実行して新規で作成した

```zsh
docker compose run --rm backend rails new . --force --database=postgresql --api
docker compose up --build
docker compose exec backend rails db:create
docker compose run --rm backend bundle exec rails g scaffold api/v1/post title:string body:text
```

##### rspec Gemfile 追記 bundle 実行後下記コマンドで初期セットアップ実行

```zsh
make b
rails generate rspec:install
```

##### factory_bot や.rspec 設定

https://boku-boc.hatenablog.com/entry/2021/02/06/113735

```ruby
# rails_helper.rbに追加
config.include FactoryBot::Syntax::Methods
```

https://qiita.com/yutaroud/items/c197185b7d5b5378403e

#### rspec API テストの書き方参照

https://qiita.com/k-penguin-sato/items/defdb828bd54729272ad

### フロントエンド

下記コマンドを実行

```zsh
docker compose run frontend npx create-next-app@latest
# mya-appに指定アプリ名によってdocker-composeの中身編集する必要あり
docker compose up
```

#### axios インスタンス

axios インスタンスを作成してベース URL を設定することで、各リクエストで共通の設定を使用
https://qiita.com/natuuu0831/items/2601dc9ade7e31bf2317

#### エイリアス path 使用

import パスにエイリアスをかけてパス指定を楽にするように設定
https://qiita.com/yukiji/items/b29e497aca45e7dc878e
https://qiita.com/tatsumin0206/items/fbcac2be2892ecbaec77
https://zenn.dev/aiq_dev/articles/3bcfc7bb2b7c1a

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
