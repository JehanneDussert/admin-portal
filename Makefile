.PHONY: install build run test clean

install:
	pip install -r requirements.txt

build:
	docker-compose build

run:
	docker-compose up

test:
	pytest
	rm -rf .pytest_cache

clean:
	docker-compose down -v
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -delete
	rm -rf web/node_modules
	rm -rf web/.next
