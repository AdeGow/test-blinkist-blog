# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_03_08_130256) do
  create_table "ab_tests", force: :cascade do |t|
    t.integer "article_id", null: false
    t.integer "editor_id", null: false
    t.integer "control_variation_id", null: false
    t.integer "test_variation_id", null: false
    t.date "start_date"
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_active", default: false
    t.index ["article_id"], name: "index_ab_tests_on_article_id"
    t.index ["control_variation_id"], name: "index_ab_tests_on_control_variation_id"
    t.index ["editor_id"], name: "index_ab_tests_on_editor_id"
    t.index ["test_variation_id"], name: "index_ab_tests_on_test_variation_id"
  end

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.integer "editor_id", null: false
    t.integer "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_articles_on_category_id"
    t.index ["editor_id"], name: "index_articles_on_editor_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "editors", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "variations", force: :cascade do |t|
    t.integer "category_id", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_variations_on_category_id"
  end

  add_foreign_key "ab_tests", "articles"
  add_foreign_key "ab_tests", "editors"
  add_foreign_key "ab_tests", "variations", column: "control_variation_id"
  add_foreign_key "ab_tests", "variations", column: "test_variation_id"
  add_foreign_key "articles", "categories"
  add_foreign_key "articles", "editors"
  add_foreign_key "variations", "categories"
end
