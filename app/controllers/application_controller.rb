class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  
  private

  def get_user_from_token
    jwt_payload = JWT.decode(request.headers["Authorization"].split(' ')[1], Rails.application.credentials.fetch(:secret_key_base)).first
    user_id = jwt_payload['sub']
    user = User.find_by(id: user_id.to_s)
  end
end
