Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root 'pages#landing'

      resources :articles, only: [:index, :show] do
        resources :ab_tests, only: [:index, :show] do
          resources :variations, only: [:index, :show_control_variation, :show_test_variation]
        end
      end

      get '/articles/:article_id/ab-tests', to: 'ab_tests#index', as: 'ab_tests'
      get '/articles/:article_id/ab-tests/:id', to: 'ab_tests#show', as: 'ab_test'

      get '/articles/:article_id/ab-tests/:ab_test_id/variations', to: 'variations#index', as: 'variations'
      get '/articles/:article_id/ab-tests/:ab_test_id/variations/control-variation', to: 'variations#show_control_variation', as: 'control_variation'
      get '/articles/:article_id/ab-tests/:ab_test_id/variations/test-variation', to: 'variations#show_test_variation', as: 'test_variation'

      get '/articles/:id', to: 'articles#show'

    end
  end
end
