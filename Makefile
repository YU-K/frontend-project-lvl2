install: install-deps

start:
	# npx babel-node 'src/bin/gendiff.js' before.yml after.yml
	# npx babel-node 'src/bin/gendiff.js' before.json after.json
	npx babel-node 'src/bin/gendiff.js' before.ini after.ini


install-deps:
	npm ci

build:
	rm -rf dist
	npm run build

test:
	npm test -- --watch

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test
