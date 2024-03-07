class Api::V1::VariationsController < ApplicationController
  before_action :set_article_and_ab_test
  before_action :set_control_variation, only: [:index, :show_control_variation, :show_test_variation]
  before_action :set_test_variation, only: [:index, :show_control_variation, :show_test_variation]


  def index
    render json: {
      control_variation: @control_variation,
      test_variation: @test_variation
    }
  end

  def show_control_variation
    render json: @control_variation
  end

  def show_test_variation
    render json: @test_variation
  end

  # def create_control_variation
  #   @control_variation = Variation.new
  #   if @control_variation.save
  #     render notice: 'Your control variation was successfully created !'
  #   else
  #     flash.now[:alert] = 'Failed to create the control variation. Please enter again the required information.'
  #     render :new, status: :unprocessable_entity
  #   end
  # end

  # def create_test_variation
  #   @test_variation = Variation.new
  #   if @test_variation.save
  #     redirect_to test_variation_path(@test_variation)
  #   else
  #     render new
  #   end
  # end

  private

  def set_article_and_ab_test
    @article = Article.find(params[:article_id])
    @ab_test = @article.ab_tests.find(params[:ab_test_id])
  end

  def set_control_variation
    @control_variation = @ab_test.control_variation
  end

  def set_test_variation
    @test_variation = @ab_test.test_variation
  end

end
