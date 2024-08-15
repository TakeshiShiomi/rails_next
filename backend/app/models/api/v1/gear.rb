class Api::V1::Gear < ApplicationRecord
  def ratio
    chainring / cog
  end

  def gear_inches
    ratio * wheel.diameter
  end
end
