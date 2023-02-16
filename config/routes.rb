Rails.application.routes.draw do

  scope :api do 
    devise_for :users, path: '', path_names: {
      sign_in: 'users/login',
      sign_out: 'logout',
      registration: 'users/signup',
      invitation: 'users/invite'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      invitations: 'users/invitations'
    }
    get '/current_user', to: 'current_user#index'

    resources :members 
    root to: 'home#index'
    get '*path' => 'home#index'
  end
end
