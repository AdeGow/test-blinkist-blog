class Article < ApplicationRecord
  belongs_to :editor
  belongs_to :category

  has_many :ab_tests, dependent: :destroy
  has_many :variations, through: :ab_tests
end
