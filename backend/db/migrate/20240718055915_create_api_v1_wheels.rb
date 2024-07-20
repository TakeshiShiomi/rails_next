class CreateApiV1Wheels < ActiveRecord::Migration[7.1]
  def change
    create_table :api_v1_wheels do |t|
      t.string :name
      t.decimal :rim
      t.decimal :tire

      t.timestamps
    end
  end
end
