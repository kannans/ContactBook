class MembersController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = User.order(id: :desc)
    render json: {
      status: {code: 200, message: 'users loaded.'},
      data: @users
    }
  end
end
