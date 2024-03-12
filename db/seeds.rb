require 'faker'

puts ''
puts 'Cleaning database...'

AbTest.destroy_all
Article.destroy_all
Variation.destroy_all
Category.destroy_all
Editor.destroy_all

puts 'Swept and cleansed!'
puts ''
puts ''

###################################
#                                 #
#                                 #
#           CATEGORIES            #
#                                 #
#                                 #
###################################

puts 'Creating categories...'
puts '..........................'

image = Category.create!(name: 'Image')
video = Category.create!(name: 'Video')
text = Category.create!(name: 'Text')
book_list = Category.create!(name: 'Book list')
quote = Category.create!(name: 'Quote')
news = Category.create!(name: 'News')
summary = Category.create!(name: 'Summary')
guide = Category.create!(name: 'Guide')

puts "#{Category.count} categories created."

###################################
#                                 #
#                                 #
#              EDITORS            #
#                                 #
#                                 #
###################################

puts 'Creating editors...'
puts '..........................'

kate = Editor.create!(name: 'Kate Moon')
paul = Editor.create!(name: 'Paul Star')
ed = Editor.create!(name: 'Ed Sun')
joyce = Editor.create!(name: 'Joyce Sky')

puts "#{Editor.count} editors created."

# ###################################
# #                                 #
# #                                 #
# #             ARTICLES            #
# #                                 #
# #                                 #
# ###################################

puts 'Creating articles...'
puts '..........................'

15.times do
  article = Article.new(
    title: Faker::Movies::HarryPotter.quote,
    content: Faker::HTML.sandwich(sentences: 5, repeat: 3),
    editor: Editor.all.sample,
    category: Category.all.sample
  )
  article.save!
end

puts "#{Article.count} articles created."

###################################
#                                 #
#                                 #
#            VARIATIONS           #
#                                 #
#                                 #
###################################

puts 'Creating Variations...'
puts '..........................'

8.times do
  variation = Variation.new(
    category: Category.all.sample,
    content: Faker::HTML.sandwich(sentences: 5, repeat: 3)
  )
  variation.save!
end

puts "#{Variation.count} variations created."

###################################
#                                 #
#                                 #
#             AB TESTS            #
#                                 #
#                                 #
###################################

puts 'Creating A/B tests...'
puts '..........................'

50.times do
  article = Article.all.sample
  editor = article.editor
  control_variation = Variation.all.sample
  test_variation = Variation.where.not(id: control_variation.id).sample
  AbTest.create!(
    article: article,
    editor: editor,
    control_variation: control_variation,
    test_variation: test_variation,
    start_date: Date.today + rand(1..6),
    end_date: Date.today + rand(6..35),
    is_active: false
  )
end

all_articles = Article.all

all_articles.each do |article|
  article.ab_tests.first.update(is_active: true)
end

puts "#{AbTest.count} A/B tests created."
puts ''
puts ''
puts 'Finished generating a nice seed!'
puts ''
