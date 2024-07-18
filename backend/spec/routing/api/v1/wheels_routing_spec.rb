require "rails_helper"

RSpec.describe Api::V1::WheelsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/wheels").to route_to("api/v1/wheels#index")
    end

    it "routes to #show" do
      expect(get: "/api/v1/wheels/1").to route_to("api/v1/wheels#show", id: "1")
    end

    it "routes to #create" do
      expect(post: "/api/v1/wheels").to route_to("api/v1/wheels#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/v1/wheels/1").to route_to("api/v1/wheels#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/v1/wheels/1").to route_to("api/v1/wheels#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/wheels/1").to route_to("api/v1/wheels#destroy", id: "1")
    end
  end
end
