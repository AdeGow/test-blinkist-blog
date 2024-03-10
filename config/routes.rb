Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root 'pages#landing'

      # Magazine routes
      scope '/magazine' do
        resources :articles, only: [:index, :show]
      end

      scope '/editors-dashboard' do
        resources :articles, only: [:index, :show] do
          resources :ab_tests, only: [:index, :show, :new, :create] do
            resources :variations, only: [:index, :show_control_variation, :show_test_variation]
          end
        end
      end

      # get '/articles/:article_id/ab-tests/new', to: 'ab_tests#new', as: 'new_ab_test'
      post '/editors-dashboard/articles/:article_id/ab-tests', to: 'ab_tests#create'

      get '/editors-dashboard/articles/:article_id/ab-tests', to: 'ab_tests#index', as: 'ab_tests'
      get '/editors-dashboard/articles/:article_id/ab-tests/:id', to: 'ab_tests#show', as: 'ab_test'

      get '/editors-dashboard/articles/:article_id/ab-tests/:ab_test_id/variations', to: 'variations#index', as: 'variations'
      get '/editors-dashboard/articles/:article_id/ab-tests/:ab_test_id/variations/control-variation', to: 'variations#show_control_variation', as: 'control_variation'
      get '/editors-dashboard/articles/:article_id/ab-tests/:ab_test_id/variations/test-variation', to: 'variations#show_test_variation', as: 'test_variation'

      get '/articles/:id', to: 'articles#show'

      get '/categories', to: 'categories#index'

      get '/editors', to: 'editors#index'

      get '/ab-tests', to: 'ab_tests#index_all'

      get '/variations', to: 'variations#index_all', as: 'all_variations'

    end
  end
end
