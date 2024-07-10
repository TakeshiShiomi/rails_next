# 注意事項: このファイルはタブ文字を使用、スペース文字は使用しない
# build
build:
	docker compose build

# 起動
up:
	docker compose up
upd:
	docker compose up -d
upbuild:
	docker compose up --build

# コンテナ内に入る
b:
	docker compose exec backend bash
f:
	docker compose exec frontend ash

# 再起動
re:
	docker compose restart

# シャットダウン
down:
	docker compose down

# volume以外を削除
prune:
	docker system prune

# bundle install
bundle:
	docker compose run --rm backend bundle

# rubocop
rubocop:
	docker compose run --rm backend bundle exec rubocop

rubocop-a:
	docker compose run --rm backend bundle exec rubocop -a

# rspec
rspec:
	docker compose run --rm backend bundle exec rspec

# bundler audit
audit:
	docker compose run --rm backend bundle exec bundler-audit check --update

# brakeman
brake:
	docker compose run --rm backend bundle exec brakeman

# backendチェック
fixb:
	docker compose run --rm backend bundle exec rubocop && \
	docker compose run --rm backend bundle exec rspec && \
	docker compose run --rm backend bundle exec bundler-audit check --update && \
	docker compose run --rm backend bundle exec brakeman

# frontendチェック
fixf:
	docker compose run --rm frontend npm run format:check && \
	docker compose run --rm frontend npm run lint

# frontend自動修正
fixf-a:
	docker compose run --rm frontend npm run format:fix && \
	docker compose run --rm frontend npm run lint:fix
