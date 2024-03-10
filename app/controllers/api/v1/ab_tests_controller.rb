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
    @ab_test = AbTest.new(ab_test_params)

    if @ab_test.save
      render json: @ab_test, status: :created
    else
      render json: @ab_test.errors, status: :unprocessable_entity
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
    params.require(:ab_test).permit(
      :article_id, :editor_id, :start_date, :end_date, :is_active,
      control_variation_attributes: [:category_id, :content, :_destroy],
      test_variation_attributes: [:category_id, :content, :_destroy]
    )
  end
end
