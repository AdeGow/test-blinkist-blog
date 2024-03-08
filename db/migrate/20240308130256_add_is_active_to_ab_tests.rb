class AddIsActiveToAbTests < ActiveRecord::Migration[6.0]
  def change
    add_column :ab_tests, :is_active, :boolean, default: false
  end
end
