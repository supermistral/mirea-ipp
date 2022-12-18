DC = docker-compose -f docker-compose.yml -p contact-list

BACKEND_SERVICE=backend
ALEMBIC_PATH = ./backend/migrations

up:
	$(DC) up

stop:
	$(DC) stop

makemigrations:
	$(DC) exec $(BACKEND_SERVICE) alembic revision --autogenerate -m "$(filter-out $@,$(MAKECMDGOALS))"

migrate:
	$(DC) exec $(BACKEND_SERVICE) alembic upgrade head

up-db:
	$(DC) up -d database

delete-db: stop
	$(DC) rm -v database
	rm -rf $(ALEMBIC_PATH)/versions/*

recreate-db: delete-db up
	sleep 2
	$(MAKE) makemigrations "init"
	$(MAKE) migrate

%:
	@: