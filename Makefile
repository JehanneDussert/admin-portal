.PHONY: install build run test clean

install:
	pip install -r api/requirements.txt
	cd web && pnpm i
	cd ..

build:
	docker-compose build

run:
	docker-compose up

test:
	pytest
	rm -rf .pytest_cache
	cd web && pnpm run cypress:run
	cd ..

clean:
	docker-compose down -v
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -delete
	rm -rf web/node_modules
	rm -rf web/.next
