install: install-deps

start:
	 npx babel-node 'src/bin/index.js' -f json /home/user/before_r.ini /home/user/after_r.ini

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
