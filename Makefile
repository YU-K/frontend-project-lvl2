install: install-deps

start:
	# npx babel-node 'src/bin/gendiff.js' -f plain before_r.json after_r.json
	npx babel-node 'src/bin/gendiff.js' -f json before_r.json after_r.json
	# npx babel-node 'src/bin/gendiff.js' before.json after.json


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
