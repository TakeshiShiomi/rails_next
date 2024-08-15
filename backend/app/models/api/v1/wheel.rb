class Api::V1::Wheel < ApplicationRecord
  def diameter
    rim + (tire * 2)
  end

  def circumference
    diameter * Math::PI
  end
end
