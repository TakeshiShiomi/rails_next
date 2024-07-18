class Api::V1::GearsController < ApplicationController
  before_action :set_api_v1_gear, only: %i[show update destroy]

  # GET /api/v1/gears
  def index
    @api_v1_gears = Api::V1::Gear.all

    render json: @api_v1_gears
  end

  # GET /api/v1/gears/1
  def show
    render json: @api_v1_gear
  end

  # POST /api/v1/gears
  def create
    @api_v1_gear = Api::V1::Gear.new(api_v1_gear_params)

    if @api_v1_gear.save
      render json: @api_v1_gear, status: :created, location: @api_v1_gear
    else
      render json: @api_v1_gear.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/gears/1
  def update
    if @api_v1_gear.update(api_v1_gear_params)
      render json: @api_v1_gear
    else
      render json: @api_v1_gear.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/gears/1
  def destroy
    @api_v1_gear.destroy!
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_api_v1_gear
      @api_v1_gear = Api::V1::Gear.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def api_v1_gear_params
      params.require(:api_v1_gear).permit(:name, :chainring, :cog)
    end
end
