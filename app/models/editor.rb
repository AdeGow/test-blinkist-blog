class Editor < ApplicationRecord
  has_many :ab_tests
  has_many :articles
end
