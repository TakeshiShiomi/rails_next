RSpec.describe "/api/v1/wheels", type: :request do
  let!(:wheel_instance) { create(:wheel) }
  let(:updated_attributes) { { name: 'Update name', rim: 20.5, tire: 1.95 } }

  describe "GET /index" do
    it "http status okを返すこと" do
      get api_v1_wheels_url, as: :json
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /show" do
    it "http status okを返すこと" do
      get api_v1_wheel_url(wheel_instance), as: :json
      expect(response).to have_http_status(:ok)
    end
  end

  # TODO: 異常系のテストを追加する(contextを使って)
  describe "POST /create" do
    it "新しいwheelが作成されること" do
      expect {
        post api_v1_wheels_path, params: { api_v1_wheel: { name: wheel_instance.name, rim: wheel_instance.rim, tire: wheel_instance.tire } },
                                 as: :json
      }.to change(Api::V1::Wheel, :count).by(+1)

      expect(response).to have_http_status(:created)
    end
  end

  describe "PATCH /update" do
    it "wheelが更新されること" do
      patch api_v1_wheel_path(wheel_instance), params: { api_v1_wheel: updated_attributes }, as: :json
      wheel_instance.reload

      expect(wheel_instance.name).to eq(updated_attributes[:name])
      expect(wheel_instance.rim).to eq(updated_attributes[:rim])
      expect(wheel_instance.tire).to eq(updated_attributes[:tire])
      expect(response).to have_http_status(:ok)
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested api_v1_wheel" do
      expect {
        delete api_v1_wheel_url(wheel_instance), as: :json
      }.to change(Api::V1::Wheel, :count).by(-1)
    end
  end
end
