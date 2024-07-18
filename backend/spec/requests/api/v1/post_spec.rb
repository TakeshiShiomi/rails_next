RSpec.describe "Api::V1::Posts", type: :request do
  let!(:post_instance) { create(:post) }
  let(:updated_attributes) { { title: 'Update title', body: 'Update body' } }

  describe "GET /index" do
    it "http status okを返すこと" do
      get api_v1_posts_path, as: :json

      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /create" do
    it "新しいpostが作成されること" do
      expect {
        post api_v1_posts_path, params: { api_v1_post: { title: post_instance.title, body: post_instance.body } }, as: :json
      }.to change(Api::V1::Post, :count).by(+1)

      expect(response).to have_http_status(:created)
    end
  end

  describe "GET /show" do
    it "http status okを返すこと" do
      get api_v1_post_path(post_instance), as: :json

      expect(response).to have_http_status(:ok)
    end
  end

  describe "PATCH /update" do
    it "postが更新されること" do
      patch api_v1_post_path(post_instance), params: { api_v1_post: updated_attributes }, as: :json
      post_instance.reload

      expect(post_instance.title).to eq(updated_attributes[:title])
      expect(post_instance.body).to eq(updated_attributes[:body])
      expect(response).to have_http_status(:ok)
    end
  end

  describe "DELETE /destroy" do
    it "postデータが削除されること" do
      expect {
        delete api_v1_post_path(post_instance), as: :json
      }.to change(Api::V1::Post, :count).by(-1)

      expect(response).to have_http_status(:no_content)
    end
  end
end
