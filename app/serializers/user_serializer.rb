class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email, :jti, :created_at, :access_token, :refresh_token

  attribute :access_token do |user|
    user && user.jti
  end

  attribute :refresh_token do |user|
    user && user.jti
  end
end
