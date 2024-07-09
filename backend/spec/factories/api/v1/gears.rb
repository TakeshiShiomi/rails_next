FactoryBot.define do
  factory :gear, class: 'Api::V1::Gear' do
    name { "New Gear" }
    chainring { "9.99" }
    cog { "9.98" }
  end
end
