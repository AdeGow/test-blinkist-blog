class Api::V1::AbTestsController < ApplicationController
  before_action :set_article
  before_action :set_ab_test, only: [:show]

  def index
    @ab_tests = @article.ab_tests
    render json: @ab_tests
  end

  def show
    @ab_test = AbTest.find(params[:id])
    render json: @ab_test
  end

  private

  def set_article
    @article = Article.find(params[:article_id])
  end

  def set_ab_test
    # Find the A/B test associated with the article
    @ab_test = @article.ab_tests.find(params[:id])
  end

  # def ab_test_params
  #   params.require(:ab_test).permit(
  #     :editor_id,
  #     :start_date,
  #     :end_date,
  #     control_variation_attributes: [:category_id, :content],
  #     test_variation_attributes: [:category_id, :content]
  #   )
  # end
end
