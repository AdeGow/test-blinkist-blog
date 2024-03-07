class CreateAbTests < ActiveRecord::Migration[6.0]  # Adjust the version as per your Rails version
  def change
    create_table :ab_tests do |t|
      t.references :article, null: false, foreign_key: true
      t.references :editor, null: false, foreign_key: true
      t.references :control_variation, null: false, foreign_key: { to_table: :variations }
      t.references :test_variation, null: false, foreign_key: { to_table: :variations }
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
