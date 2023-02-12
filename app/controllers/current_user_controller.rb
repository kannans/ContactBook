class CurrentUserController < ApplicationController
  before_action :authenticate_user!
  respond_to :json
  def index
    render json: {
      status: {code: 200, message: 'Logged in sucessfully.'},
      data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
    }, status: :ok
  end
end
