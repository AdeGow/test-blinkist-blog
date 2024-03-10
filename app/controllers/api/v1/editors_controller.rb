class Api::V1::EditorsController < ApplicationController
  def index
    @editors = Editor.all
    render json: @editors
  end
end
