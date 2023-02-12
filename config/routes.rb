Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'users/login',
    sign_out: 'logout',
    registration: 'users/signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  get '/current_user', to: 'current_user#index'

  resources :users do
    collection do 
      get :me
    end
  end
  root to: 'home#index'
  get '*path' => 'home#index'
end
