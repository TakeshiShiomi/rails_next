FactoryBot.define do
  factory :post, class: 'Api::V1::Post' do # Api::V1::Postモデルのファクトリーを定義
    title { "New title" }
    body { "New body" }
  end
end
