class AbTest < ApplicationRecord
  belongs_to :article
  belongs_to :editor
  belongs_to :control_variation, class_name: 'Variation', foreign_key: 'control_variation_id'
  belongs_to :test_variation, class_name: 'Variation', foreign_key: 'test_variation_id'
end
