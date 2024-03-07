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

  def new
    @ab_test = AbTest.new
    render json: { message: 'Hello from ab_tests#new action' }
  end

  def create
    @ab_test = AbTest.new(ab_test_params)
    @ab_test.article_id = @article.id
    render json: { message: 'Hello from ab_tests#create action' }
    if @ab_test.save
      redirect_to ab_test_path(@ab_test), notice: 'Your A/B Test was successfully created !'
    else
      flash.now[:alert] = 'Failed to create A/B Test. Please enter again the required information.'
      render :new, status: :unprocessable_entity
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
      :editor_id,
      :start_date,
      :end_date,
      control_variation_attributes: [:category_id, :content],
      test_variation_attributes: [:category_id, :content]
    )
  end
end
