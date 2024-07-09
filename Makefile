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
	docker compose run backend bundle

# rubocop
rubocop:
	docker compose run backend bundle exec rubocop

rubocop-a:
	docker compose run backend bundle exec rubocop -a

# rspec
rspec:
	docker compose run backend bundle exec rspec

# bundler audit
audit:
	docker compose run backend bundle exec bundler-audit check --update

# brakeman
brake:
	docker compose run backend bundle exec brakeman

# backendチェック
fixb:
	docker compose run backend bundle exec rubocop && \
	docker compose run backend bundle exec rspec && \
	docker compose run backend bundle exec bundler-audit check --update && \
	docker compose run backend bundle exec brakeman
