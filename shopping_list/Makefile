DC = docker-compose -f docker-compose.yml -p product-list-grpc

BACKEND_SERVICE=backend
FRONTEND_SERVICE=frontend
ALEMBIC_PATH=./backend/migrations

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
	sleep 8
	$(MAKE) makemigrations init
	$(MAKE) migrate

generate-grpc-backend:
	$(DC) exec $(BACKEND_SERVICE) python -m grpc_tools.protoc \
		--proto_path=./proto \
		./proto/products.proto \
		--python_out=. \
		--grpc_python_out=./src/grpc_classes

generate-grpc-frontend:
	$(DC) exec $(FRONTEND_SERVICE) npm run postinstall

%:
	@: