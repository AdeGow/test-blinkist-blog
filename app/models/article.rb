class Article < ApplicationRecord
  belongs_to :editor
  belongs_to :category
end
