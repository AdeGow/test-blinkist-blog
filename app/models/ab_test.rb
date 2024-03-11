class AbTest < ApplicationRecord
  belongs_to :article
  belongs_to :editor

  belongs_to :control_variation, class_name: 'Variation'
  belongs_to :test_variation, class_name: 'Variation'
end
