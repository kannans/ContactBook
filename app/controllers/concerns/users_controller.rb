class UsersController < ApplicationController
  before_action :current_user
  respond_to :json

  def token
    json.token user.generate_jwt
  end

  def me
    if @current_user.nil?
      render json: { error: 'Not Authorized' }, status: :unauthorized
    else
      render json: {
        id: @current_user.id,
        name: "Name",
        email: @current_user.email,
        status: "Active",
        created_at: @current_user.created_at.iso8601
      }, status: :ok
    end
  end
end