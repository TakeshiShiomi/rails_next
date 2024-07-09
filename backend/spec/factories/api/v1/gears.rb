FactoryBot.define do
  factory :api_v1_gear, class: 'Api::V1::Gear' do
    name { "MyString" }
    chainring { "9.99" }
    cog { "9.99" }
  end
end
