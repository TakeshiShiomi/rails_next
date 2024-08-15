FactoryBot.define do
  factory :wheel, class: 'Api::V1::Wheel' do
    name { "MyString" }
    rim { "19.99" }
    tire { "29.99" }
  end
end
