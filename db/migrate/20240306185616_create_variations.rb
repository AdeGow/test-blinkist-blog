class CreateVariations < ActiveRecord::Migration[7.1]
  def change
    create_table :variations do |t|
      t.references :category, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
