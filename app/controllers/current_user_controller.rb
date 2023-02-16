class CurrentUserController < ApplicationController
  before_action :user_from_auth_token
  respond_to :json
  

  def index
    render json: {
      status: {code: 200, message: 'Logged in sucessfully.'},
      data: UserSerializer.new(@current_user).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  def user_from_auth_token
    @current_user = User.last
  end
end
