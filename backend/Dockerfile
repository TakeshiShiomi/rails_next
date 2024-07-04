# backend/Dockerfile
FROM ruby:3.3.3

# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs postgresql-client

# Set working directory
RUN mkdir /myapp
WORKDIR /myapp

# Install gems
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN gem update --system && gem install bundler \
    && bundle config set force_ruby_platform true \
    && bundle install
ADD . /myapp

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3000"]
