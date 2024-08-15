RSpec.describe Api::V1::Gear, type: :model do
  let(:gear_instance) { create(:gear) }

  describe '#ratio' do
    it 'チェーンリングとコグの比率を計算する' do
      expect(gear_instance.ratio).to eq(BigDecimal("9.99") / BigDecimal("9.98"))
    end

    it 'BigDecimalを返す' do
      expect(gear_instance.ratio).to be_a(BigDecimal)
    end
  end
end
