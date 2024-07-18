RSpec.describe "/api/v1/gears", type: :request do
  let!(:gear_instance) { create(:gear) }
  let(:updated_attributes) { { name: 'Update name', chainring: 11.1, cog: 11.2 } }

  describe "GET /index" do
    it "http status okを返すこと" do
      get api_v1_gears_url, as: :json
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /show" do
    it "http status okを返すこと" do
      get api_v1_gear_url(gear_instance), as: :json
      expect(response).to have_http_status(:ok)
    end
  end

  # TODO: 異常系のテストを追加する(contextを使って)
  describe "POST /create" do
    it "新しいgearが作成されること" do
      expect {
        post api_v1_gears_path, params: { api_v1_gear: { name: gear_instance.name, chainring: gear_instance.chainring, cog: gear_instance.cog } },
                                as: :json
      }.to change(Api::V1::Gear, :count).by(+1)

      expect(response).to have_http_status(:created)
    end
  end

  describe "PATCH /update" do
    it "gearが更新されること" do
      patch api_v1_gear_path(gear_instance), params: { api_v1_gear: updated_attributes }, as: :json
      gear_instance.reload

      expect(gear_instance.name).to eq(updated_attributes[:name])
      expect(gear_instance.chainring).to eq(updated_attributes[:chainring])
      expect(gear_instance.cog).to eq(updated_attributes[:cog])
      expect(response).to have_http_status(:ok)
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested api_v1_gear" do
      expect {
        delete api_v1_gear_url(gear_instance), as: :json
      }.to change(Api::V1::Gear, :count).by(-1)
    end
  end
end
