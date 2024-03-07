class Api::V1::PagesController < ApplicationController
  def landing
    render json: { message: 'Hello world' }
  end
end
