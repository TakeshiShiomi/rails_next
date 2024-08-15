RSpec.describe Api::V1::Wheel, type: :model do
  let(:wheel_instance) { create(:wheel) }

  describe '#diameter' do
    it 'ホイールの直径を計算する' do
      expect(wheel_instance.diameter).to eq(BigDecimal("19.99") + BigDecimal("29.99") * 2)
    end

    it 'BigDecimalを返す' do
      expect(wheel_instance.diameter).to be_a(BigDecimal)
    end
  end

  describe '#circumference' do
    it 'ホイールの円周を計算する' do
      expected_circumference = (BigDecimal("19.99") + BigDecimal("29.99") * 2) * Math::PI
      expect(wheel_instance.circumference).to eq(expected_circumference)
    end

    it 'BigDecimalを返す' do
      expect(wheel_instance.circumference).to be_a(BigDecimal)
    end
  end
end
