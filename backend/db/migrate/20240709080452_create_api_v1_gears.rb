class CreateApiV1Gears < ActiveRecord::Migration[7.1]
  def change
    create_table :api_v1_gears do |t|
      t.string :name
      t.decimal :chainring
      t.decimal :cog

      t.timestamps
    end
  end
end
