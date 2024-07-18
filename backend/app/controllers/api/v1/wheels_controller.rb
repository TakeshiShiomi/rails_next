class Api::V1::WheelsController < ApplicationController
  before_action :set_api_v1_wheel, only: %i[show update destroy]

  # GET /api/v1/wheels
  def index
    @api_v1_wheels = Api::V1::Wheel.all

    render json: @api_v1_wheels
  end

  # GET /api/v1/wheels/1
  def show
    render json: @api_v1_wheel
  end

  # POST /api/v1/wheels
  def create
    @api_v1_wheel = Api::V1::Wheel.new(api_v1_wheel_params)

    if @api_v1_wheel.save
      render json: @api_v1_wheel, status: :created, location: @api_v1_wheel
    else
      render json: @api_v1_wheel.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/wheels/1
  def update
    if @api_v1_wheel.update(api_v1_wheel_params)
      render json: @api_v1_wheel
    else
      render json: @api_v1_wheel.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/wheels/1
  def destroy
    @api_v1_wheel.destroy!
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_api_v1_wheel
      @api_v1_wheel = Api::V1::Wheel.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def api_v1_wheel_params
      params.require(:api_v1_wheel).permit(:name, :rim, :tire)
    end
end
