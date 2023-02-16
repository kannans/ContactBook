class User < ApplicationRecord
  devise :invitable, :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

end
