RSpec.describe Api::V1::GearsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/gears").to route_to("api/v1/gears#index")
    end

    it "routes to #show" do
      expect(get: "/api/v1/gears/1").to route_to("api/v1/gears#show", id: "1")
    end

    it "routes to #create" do
      expect(post: "/api/v1/gears").to route_to("api/v1/gears#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/v1/gears/1").to route_to("api/v1/gears#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/v1/gears/1").to route_to("api/v1/gears#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/gears/1").to route_to("api/v1/gears#destroy", id: "1")
    end

    it "routes to #ratio" do
      expect(get: "/api/v1/gears/1/ratio").to route_to("api/v1/gears#ratio", id: "1")
    end
  end
end
