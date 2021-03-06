install: install-deps

start:
	 npx babel-node 'src/bin/gendiff.js' -f json  /home/user/before_r.json /home/user/after_r.json

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
