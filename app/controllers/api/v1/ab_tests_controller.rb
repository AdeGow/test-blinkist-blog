class Api::V1::AbTestsController < ApplicationController
  before_action :set_article, only: [:index, :show, :new, :create]
  before_action :set_ab_test, only: [:show]

  def index_all
    @all_ab_tests = AbTest.all
    render json: @all_ab_tests
  end

  def index
    @ab_tests = @article.ab_tests
    render json: @ab_tests
  end

  def show
    @ab_test = AbTest.find(params[:id])
    render json: @ab_test
  end

  def new
    @ab_test = AbTest.new
  end

  def create
    begin
      ActiveRecord::Base.transaction do
        # Create control variation
        control_variation = Variation.create!(ab_test_variation_params[:control_variation_attributes])

        # Create test variation
        test_variation = Variation.create!(ab_test_variation_params[:test_variation_attributes])

        # Create ab_test and associate variations
        @ab_test = @article.ab_tests.new(ab_test_params)
        @ab_test.control_variation_id = control_variation.id
        @ab_test.test_variation_id = test_variation.id

        if @ab_test.save
          render json: @ab_test, status: :created
        else
          render json: @ab_test.errors, status: :unprocessable_entity
        end
      end
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  private

  def set_article
    @article = Article.find(params[:article_id])
  end

  def set_ab_test
    @ab_test = @article.ab_tests.find(params[:id])
  end

  def ab_test_params
    params.require(:ab_test).permit(:editor_id, :start_date, :end_date, :is_active)
  end

  def ab_test_variation_params
    params.require(:ab_test).permit(control_variation_attributes: [:category_id, :content], test_variation_attributes: [:category_id, :content])
  end
end
