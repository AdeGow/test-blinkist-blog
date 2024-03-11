class Variation < ApplicationRecord
  belongs_to :category
  has_many :ab_tests, dependent: :destroy
end
