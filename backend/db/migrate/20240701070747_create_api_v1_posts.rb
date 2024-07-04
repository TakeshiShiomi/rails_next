class CreateApiV1Posts < ActiveRecord::Migration[7.1]
  def change
    create_table :api_v1_posts do |t|
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
